"""
API routes for chat (with database persistence)
"""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime
import json

from app.agents.tax_agent import TaxReformAgent
from app.config.database import get_db
from app.models.database import User, Conversation, Message
from app.api.dependencies import get_current_user

router = APIRouter()

# Global agent instance (initialized in main.py)
agent: Optional[TaxReformAgent] = None


def set_agent(tax_agent: TaxReformAgent):
    """Set the global agent instance."""
    global agent
    agent = tax_agent


# Request/Response Models
class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    question: str = Field(..., description="User's question", min_length=1)
    conversation_id: Optional[str] = Field(None, description="Conversation ID")
    
    class Config:
        json_schema_extra = {
            "example": {
                "question": "What are the Nigerian Tax Reform Bills?",
                "conversation_id": "conv_123456"
            }
        }


class Source(BaseModel):
    """Source citation model."""
    bill_name: str
    section: str
    page: str
    excerpt: Optional[str] = None


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    answer: str
    sources: List[Source]
    conversation_id: str
    needs_retrieval: bool
    misconception_detected: bool
    related_questions: List[str]


class ConversationSummary(BaseModel):
    """Conversation summary model."""
    id: str
    title: str
    created_at: str
    updated_at: str
    message_count: int


class ConversationDetail(BaseModel):
    """Detailed conversation with messages."""
    id: str
    title: str
    created_at: str
    updated_at: str
    messages: List[Dict[str, Any]]


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Send message to AI assistant.
    Requires authentication. Saves conversation to database.
    """
    if agent is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI agent not initialized"
        )
    
    try:
        # Get or create conversation
        if request.conversation_id:
            conversation = db.query(Conversation).filter(
                Conversation.id == request.conversation_id,
                Conversation.user_id == current_user.id
            ).first()
            
            if not conversation:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Conversation not found"
                )
        else:
            # Create new conversation
            conversation = Conversation(
                user_id=current_user.id,
                title="New conversation"  # Will update with first message
            )
            db.add(conversation)
            db.commit()
            db.refresh(conversation)
        
        # Save user message to database
        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=request.question
        )
        db.add(user_message)
        
        # Get conversation history for context
        messages = db.query(Message).filter(
            Message.conversation_id == conversation.id
        ).order_by(Message.created_at).limit(20).all()  # Last 20 messages
        
        # Build history for agent
        history = []
        for msg in messages:
            if msg.role == "user":
                history.append({"role": "user", "content": msg.content})
            else:
                history.append({"role": "assistant", "content": msg.content})
        
        # Process query with agent
        result = agent.process_query(
            question=request.question,
            conversation_id=conversation.id
        )
        
        # Save assistant message to database
        assistant_message = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=result['answer'],
            sources=json.dumps(result['sources']) if result['sources'] else None,
            misconception_detected=result.get('misconception_detected', False),
            related_questions=json.dumps(result.get('related_questions', []))
        )
        db.add(assistant_message)
        
        # Update conversation title if first message
        if conversation.title == "New conversation" and len(messages) == 0:
            # Use first few words of question as title
            title = request.question[:50] + "..." if len(request.question) > 50 else request.question
            conversation.title = title
        
        # Update conversation timestamp
        conversation.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(assistant_message)
        
        return ChatResponse(
            answer=result['answer'],
            sources=[Source(**src) for src in result['sources']],
            conversation_id=conversation.id,
            needs_retrieval=result['needs_retrieval'],
            misconception_detected=result.get('misconception_detected', False),
            related_questions=result.get('related_questions', [])
        )
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing query: {str(e)}"
        )


@router.get("/conversations", response_model=List[ConversationSummary])
async def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50,
    offset: int = 0
):
    """
    Get all conversations for current user.
    """
    conversations = db.query(Conversation).filter(
        Conversation.user_id == current_user.id
    ).order_by(Conversation.updated_at.desc()).offset(offset).limit(limit).all()
    
    result = []
    for conv in conversations:
        message_count = db.query(Message).filter(
            Message.conversation_id == conv.id
        ).count()
        
        result.append(ConversationSummary(
            id=conv.id,
            title=conv.title or "New conversation",
            created_at=conv.created_at.isoformat(),
            updated_at=conv.updated_at.isoformat(),
            message_count=message_count
        ))
    
    return result


@router.get("/conversations/{conversation_id}", response_model=ConversationDetail)
async def get_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get specific conversation with all messages.
    """
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at).all()
    
    message_list = []
    for msg in messages:
        message_dict = {
            "id": msg.id,
            "role": msg.role,
            "content": msg.content,
            "created_at": msg.created_at.isoformat()
        }
        
        if msg.sources:
            message_dict["sources"] = json.loads(msg.sources)
        if msg.related_questions:
            message_dict["related_questions"] = json.loads(msg.related_questions)
        if msg.misconception_detected:
            message_dict["misconception_detected"] = True
        
        message_list.append(message_dict)
    
    return ConversationDetail(
        id=conversation.id,
        title=conversation.title or "New conversation",
        created_at=conversation.created_at.isoformat(),
        updated_at=conversation.updated_at.isoformat(),
        messages=message_list
    )


@router.delete("/conversations/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a conversation and all its messages.
    """
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    db.delete(conversation)
    db.commit()
    
    return None


@router.post("/conversations/new")
async def create_conversation(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new conversation.
    """
    conversation = Conversation(
        user_id=current_user.id,
        title="New conversation"
    )
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    return {
        "conversation_id": conversation.id,
        "message": "New conversation created"
    }


@router.get("/health")
async def health_check():
    """Health check endpoint (no auth required)."""
    if agent is None:
        return {
            "status": "initializing",
            "message": "System is starting up",
            "vectorstore_initialized": False
        }
    
    try:
        stats = agent.vectorstore.get_stats()
        return {
            "status": "healthy",
            "message": "System is ready",
            "vectorstore_initialized": stats['status'] == 'initialized',
            "document_count": stats.get('document_count', 0)
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "message": f"System error: {str(e)}",
            "vectorstore_initialized": False
        }