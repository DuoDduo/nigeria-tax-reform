"""
Document ingestion pipeline for tax bills.
"""
from typing import List, Dict, Any
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.utils.document_parser import process_all_tax_bills
from app.rag.vectorstore import TaxBillVectorStore
import os


class TaxBillIngestionPipeline:
    """Pipeline for ingesting and processing tax bill documents."""
    
    def __init__(self, data_dir: str = "./data/tax_bills"):
        """
        Initialize ingestion pipeline.
        
        Args:
            data_dir: Directory containing tax bill PDFs
        """
        self.data_dir = data_dir
        self.chunk_size = int(os.getenv("CHUNK_SIZE", "1000"))
        self.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "200"))
        
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
    
    def process_documents(self) -> List[Dict[str, Any]]:
        """
        Process all tax bill PDFs.
        
        Returns:
            List of processed document chunks
        """
        print("=" * 60)
        print("STARTING DOCUMENT INGESTION PIPELINE")
        print("=" * 60)
        
        # Extract text from PDFs
        print("\n[1/3] Extracting text from PDFs...")
        raw_chunks = process_all_tax_bills(self.data_dir)
        
        if not raw_chunks:
            raise ValueError("No documents were extracted from PDFs")
        
        # Further split large chunks
        print(f"\n[2/3] Splitting {len(raw_chunks)} chunks into smaller pieces...")
        processed_chunks = self._split_chunks(raw_chunks)
        
        print(f"Created {len(processed_chunks)} final chunks")
        
        return processed_chunks
    
    def _split_chunks(self, raw_chunks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Split large chunks into smaller, overlapping pieces.
        
        Args:
            raw_chunks: Initial chunks from PDF parsing
            
        Returns:
            List of smaller chunks with preserved metadata
        """
        processed_chunks = []
        
        for chunk in raw_chunks:
            text = chunk['text']
            metadata = chunk['metadata']
            
            # Skip if chunk is already small enough
            if len(text) <= self.chunk_size:
                processed_chunks.append(chunk)
                continue
            
            # Split large chunks
            sub_texts = self.text_splitter.split_text(text)
            
            for idx, sub_text in enumerate(sub_texts):
                new_chunk = {
                    'text': sub_text,
                    'metadata': {
                        **metadata,
                        'sub_chunk_index': idx,
                        'total_sub_chunks': len(sub_texts)
                    }
                }
                processed_chunks.append(new_chunk)
        
        return processed_chunks
    
    def ingest_to_vectorstore(self, vectorstore: TaxBillVectorStore = None) -> TaxBillVectorStore:
        """
        Complete ingestion pipeline: process documents and add to vectorstore.
        
        Args:
            vectorstore: Existing vectorstore (optional, will create new if None)
            
        Returns:
            Initialized vectorstore with documents
        """
        # Process documents
        chunks = self.process_documents()
        
        # Initialize vectorstore if not provided
        if vectorstore is None:
            print("\n[3/3] Creating new vector store...")
            vectorstore = TaxBillVectorStore()
        else:
            print("\n[3/3] Adding to existing vector store...")
        
        # Add documents to vectorstore
        vectorstore.initialize_vectorstore(chunks)
        
        print("\n" + "=" * 60)
        print("INGESTION COMPLETE!")
        print("=" * 60)
        print(f"Total documents indexed: {len(chunks)}")
        print(f"Vector store ready at: {vectorstore.persist_directory}")
        
        return vectorstore


def run_ingestion_pipeline(data_dir: str = "./data/tax_bills"):
    """
    Convenience function to run the complete ingestion pipeline.
    
    Args:
        data_dir: Directory containing tax bill PDFs
        
    Returns:
        Initialized vectorstore
    """
    pipeline = TaxBillIngestionPipeline(data_dir=data_dir)
    vectorstore = pipeline.ingest_to_vectorstore()
    return vectorstore


if __name__ == "__main__":
    # Run ingestion when script is executed directly
    import sys
    
    data_dir = sys.argv[1] if len(sys.argv) > 1 else "./data/tax_bills"
    
    print(f"Running ingestion pipeline for: {data_dir}")
    vectorstore = run_ingestion_pipeline(data_dir)
    
    # Display stats
    stats = vectorstore.get_stats()
    print("\nVector Store Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")