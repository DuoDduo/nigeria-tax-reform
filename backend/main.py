"""
Main FastAPI application for Nigerian Tax Reform Bills Q&A.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os
from pathlib import Path
from dotenv import load_dotenv

from app.api import routes
from app.rag.vectorstore import TaxBillVectorStore
from app.rag.ingestion import run_ingestion_pipeline
from app.agents.tax_agent import TaxReformAgent

# Load environment variables
load_dotenv()

# Global instances
vectorstore: TaxBillVectorStore = None
agent: TaxReformAgent = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    print("=" * 70)
    print("STARTING NIGERIAN TAX REFORM Q&A SYSTEM")
    print("=" * 70)
    
    global vectorstore, agent
    
    try:
        # Initialize vector store
        print("\n[1/3] Initializing vector store...")
        vectorstore = TaxBillVectorStore(
            persist_directory=os.getenv("CHROMA_PERSIST_DIRECTORY", "./chroma_db")
        )
        
        # Check if vectorstore exists and has data
        try:
            vectorstore.initialize_vectorstore()
            stats = vectorstore.get_stats()
            
            if stats['document_count'] == 0:
                print("⚠ Vector store is empty. Running ingestion...")
                data_dir = "./data/tax_bills"
                
                if not Path(data_dir).exists():
                    print(f" Creating data directory: {data_dir}")
                    Path(data_dir).mkdir(parents=True, exist_ok=True)
                    print(f" Please place PDF files in: {data_dir}")
                    print("   Then restart the application.")
                else:
                    # Run ingestion pipeline
                    vectorstore = run_ingestion_pipeline(data_dir)
            else:
                print(f"✓ Loaded existing vector store with {stats['document_count']} documents")
        
        except Exception as e:
            print(f"Error loading vector store: {str(e)}")
            print("Attempting to create new vector store...")
            
            data_dir = "./data/tax_bills"
            if Path(data_dir).exists() and list(Path(data_dir).glob("*.pdf")):
                vectorstore = run_ingestion_pipeline(data_dir)
            else:
                print(f"No PDF files found in {data_dir}")
                print("   Please add PDF files and restart.")
        
        # Initialize agent
        print("\n[2/3] Initializing AI agent...")
        agent = TaxReformAgent(vectorstore)
        routes.set_agent(agent)
        print("✓ AI agent initialized")
        
        print("\n[3/3] System ready!")
        print("=" * 70)
        print("✓ Nigerian Tax Reform Q&A System is ONLINE")
        print("=" * 70)
        print(f"API Documentation: http://localhost:{os.getenv('API_PORT', '8000')}/docs")
        print("=" * 70)
    
    except Exception as e:
        print(f"\n✗ STARTUP ERROR: {str(e)}")
        print("Please check your configuration and try again.")
        raise
    
    yield
    
    # Shutdown
    print("\n" + "=" * 70)
    print("SHUTTING DOWN")
    print("=" * 70)


# Create FastAPI app
app = FastAPI(
    title="Nigerian Tax Reform Bills Q&A API",
    description="AI-powered assistant for understanding Nigerian Tax Reform Bills 2024",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes.router, prefix="/api", tags=["chat"])


# Root endpoint
@app.get("/", tags=["root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Nigerian Tax Reform Bills Q&A API",
        "version": "1.0.0",
        "documentation": "/docs",
        "health": "/api/health",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/api/health",
            "stats": "/api/stats",
            "new_conversation": "/api/conversation/new"
        }
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle uncaught exceptions."""
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "message": str(exc) if os.getenv("ENVIRONMENT") == "development" else "An error occurred"
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("API_PORT", "8000"))
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False
    )