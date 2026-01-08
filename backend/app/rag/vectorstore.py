"""
Vector store setup and management using ChromaDB.
"""
import os
from typing import List, Dict, Any
from pathlib import Path

from langchain_chroma import Chroma                 # Use langchain-chroma
from langchain_huggingface import HuggingFaceEmbeddings # Use langchain-huggingface
from langchain_core.documents import Document       # Move from schema to core


class TaxBillVectorStore:
    """Manage vector store for tax bill documents."""
    
    def __init__(self, persist_directory: str = "./chroma_db"):
        """
        Initialize vector store.
        
        Args:
            persist_directory: Directory to persist ChromaDB
        """
        self.persist_directory = persist_directory
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2"),
            model_kwargs={'device': 'cpu'}
        )
        self.vectorstore = None
        
        # Create persist directory if it doesn't exist
        Path(persist_directory).mkdir(parents=True, exist_ok=True)
    
    def initialize_vectorstore(self, chunks: List[Dict[str, Any]] = None):
        """
        Initialize or load existing vector store.
        
        Args:
            chunks: List of document chunks to index (if creating new)
        """
        try:
            # Try to load existing vectorstore
            self.vectorstore = Chroma(
                persist_directory=self.persist_directory,
                embedding_function=self.embedding_model,
                collection_name="nigerian_tax_bills"
            )
            
            # Check if vectorstore is empty
            if self.vectorstore._collection.count() == 0 and chunks:
                print("Vector store is empty. Adding documents...")
                self.add_documents(chunks)
            else:
                print(f"Loaded existing vector store with {self.vectorstore._collection.count()} documents")
                
        except Exception as e:
            print(f"Creating new vector store: {str(e)}")
            if chunks:
                self.add_documents(chunks)
            else:
                raise ValueError("No existing vectorstore and no chunks provided to create one")
    
    def add_documents(self, chunks: List[Dict[str, Any]]):
        """
        Add document chunks to vector store.
        
        Args:
            chunks: List of document chunks with text and metadata
        """
        if not chunks:
            raise ValueError("No chunks provided to add to vectorstore")
        
        # Convert chunks to LangChain Document format
        documents = []
        for chunk in chunks:
            doc = Document(
                page_content=chunk['text'],
                metadata=chunk['metadata']
            )
            documents.append(doc)
        
        print(f"Adding {len(documents)} documents to vector store...")
        
        # Create or update vectorstore
        if self.vectorstore is None:
            self.vectorstore = Chroma.from_documents(
                documents=documents,
                embedding=self.embedding_model,
                persist_directory=self.persist_directory,
                collection_name="nigerian_tax_bills"
            )
        else:
            self.vectorstore.add_documents(documents)
        
        # Persist to disk
        self.vectorstore.persist()
        print(f"✓ Vector store created/updated with {len(documents)} documents")
    
    def similarity_search(self, query: str, k: int = 5, filter_dict: Dict = None) -> List[Document]:
        """
        Perform similarity search.
        
        Args:
            query: Search query
            k: Number of results to return
            filter_dict: Metadata filter (e.g., {'bill_name': 'specific_bill'})
            
        Returns:
            List of relevant documents
        """
        if self.vectorstore is None:
            raise ValueError("Vector store not initialized")
        
        if filter_dict:
            results = self.vectorstore.similarity_search(
                query, 
                k=k,
                filter=filter_dict
            )
        else:
            results = self.vectorstore.similarity_search(query, k=k)
        
        return results
    
    def similarity_search_with_score(self, query: str, k: int = 5) -> List[tuple]:
        """
        Perform similarity search with relevance scores.
        
        Args:
            query: Search query
            k: Number of results to return
            
        Returns:
            List of (document, score) tuples
        """
        if self.vectorstore is None:
            raise ValueError("Vector store not initialized")
        
        results = self.vectorstore.similarity_search_with_score(query, k=k)
        return results
    
    def get_retriever(self, search_kwargs: Dict = None):
        """
        Get a retriever object for use in chains.
        
        Args:
            search_kwargs: Additional search parameters
            
        Returns:
            VectorStoreRetriever object
        """
        if self.vectorstore is None:
            raise ValueError("Vector store not initialized")
        
        if search_kwargs is None:
            search_kwargs = {"k": 5}
        
        return self.vectorstore.as_retriever(search_kwargs=search_kwargs)
    
    def delete_collection(self):
        """Delete the entire collection (use with caution)."""
        if self.vectorstore:
            self.vectorstore.delete_collection()
            print("✓ Vector store collection deleted")
    
    def get_stats(self) -> Dict[str, Any]:
        """Get statistics about the vector store."""
        if self.vectorstore is None:
            return {"status": "not_initialized"}
        
        count = self.vectorstore._collection.count()
        return {
            "status": "initialized",
            "document_count": count,
            "persist_directory": self.persist_directory
        }