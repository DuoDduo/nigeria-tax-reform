"""
API routes for the Tax Reform Q&A application.
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from app.agents.tax_agent import TaxReformAgent
import uuid


# Create router
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
    conversation_id: Optional[str] = Field(None, description="Conversation ID for memory")
    
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


class ConversationStatus(BaseModel):
    """Conversation status model."""
    conversation_id: str
    exists: bool
    message_count: Optional[int] = None
    turn_count: Optional[int] = None


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    message: str
    vectorstore_initialized: bool
    document_count: Optional[int] = None


# Endpoints
@router.post("/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat(request: ChatRequest):
    """
    Main chat endpoint for asking questions about tax reforms.
    
    - **question**: The user's question
    - **conversation_id**: Optional conversation ID for maintaining context
    
    Returns answer with sources and related questions.
    """
    if agent is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI agent not initialized. Please wait for system startup."
        )
    
    try:
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or f"conv_{uuid.uuid4().hex[:12]}"
        
        # Process query
        result = agent.process_query(
            question=request.question,
            conversation_id=conversation_id
        )
        
        # Format response
        response = ChatResponse(
            answer=result['answer'],
            sources=[Source(**src) for src in result['sources']],
            conversation_id=conversation_id,
            needs_retrieval=result['needs_retrieval'],
            misconception_detected=result['misconception_detected'],
            related_questions=result['related_questions']
        )
        
        return response
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing query: {str(e)}"
        )


@router.get("/conversation/{conversation_id}", response_model=ConversationStatus)
async def get_conversation_status(conversation_id: str):
    """
    Get the status of a conversation.
    
    - **conversation_id**: The conversation ID to check
    
    Returns conversation metadata.
    """
    if agent is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI agent not initialized"
        )
    
    try:
        summary = agent.get_conversation_summary(conversation_id)
        
        return ConversationStatus(
            conversation_id=conversation_id,
            exists=summary['exists'],
            message_count=summary.get('message_count'),
            turn_count=summary.get('turn_count')
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving conversation: {str(e)}"
        )


@router.delete("/conversation/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def clear_conversation(conversation_id: str):
    """
    Clear conversation history.
    
    - **conversation_id**: The conversation ID to clear
    """
    if agent is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI agent not initialized"
        )
    
    try:
        agent.clear_conversation(conversation_id)
        return None
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error clearing conversation: {str(e)}"
        )


@router.post("/conversation/new", status_code=status.HTTP_201_CREATED)
async def create_new_conversation():
    """
    Create a new conversation ID.
    
    Returns a new conversation ID that can be used for subsequent chat requests.
    """
    conversation_id = f"conv_{uuid.uuid4().hex[:12]}"
    
    return {
        "conversation_id": conversation_id,
        "message": "New conversation created"
    }


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    
    Returns system status and readiness information.
    """
    if agent is None:
        return HealthResponse(
            status="initializing",
            message="System is starting up. Please wait.",
            vectorstore_initialized=False
        )
    
    try:
        # Get vectorstore stats
        stats = agent.vectorstore.get_stats()
        
        return HealthResponse(
            status="healthy",
            message="System is ready",
            vectorstore_initialized=stats['status'] == 'initialized',
            document_count=stats.get('document_count', 0)
        )
    
    except Exception as e:
        return HealthResponse(
            status="unhealthy",
            message=f"System error: {str(e)}",
            vectorstore_initialized=False
        )


@router.get("/stats")
async def get_system_stats():
    """
    Get system statistics.
    
    Returns detailed statistics about the system.
    """
    if agent is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI agent not initialized"
        )
    
    try:
        vectorstore_stats = agent.vectorstore.get_stats()
        
        return {
            "vectorstore": vectorstore_stats,
            "active_conversations": len(agent.conversations),
            "system_status": "operational"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving stats: {str(e)}"
        )