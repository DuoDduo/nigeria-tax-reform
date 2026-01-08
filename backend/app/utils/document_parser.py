"""
Document parser for extracting and structuring content from tax bill PDFs.
"""
import re
from typing import List, Dict, Any
import pdfplumber
from pathlib import Path


class TaxBillParser:
    """Parse Nigerian Tax Reform Bills with structure preservation."""
    
    def __init__(self):
        # Enhanced patterns for Nigerian legal documents
        self.section_pattern = re.compile(
            r'^(PART|SECTION|CHAPTER|SCHEDULE|ARTICLE)\s+[IVXLCDM\d]+',
            re.IGNORECASE
        )
        self.subsection_pattern = re.compile(r'^\(\d+\)|\([a-z]\)')
        
        # Common section keywords in Nigerian bills
        self.section_keywords = [
            'PART', 'CHAPTER', 'SECTION', 'SCHEDULE', 'ARTICLE',
            'INTERPRETATION', 'DEFINITIONS', 'APPLICATION',
            'COMMENCEMENT', 'ADMINISTRATION', 'REGULATIONS',
            'ARRANGEMENT OF SECTIONS', 'SHORT TITLE'
        ]
        
    def extract_text_from_pdf(self, pdf_path: str) -> List[Dict[str, Any]]:
        """
        Extract text from PDF with metadata preservation.
        
        Args:
            pdf_path: Path to the PDF file
            
        Returns:
            List of document chunks with metadata
        """
        chunks = []
        current_section = "Preamble"
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                # Clean bill name for display
                bill_name = Path(pdf_path).stem.replace('HB.-', 'HB ').replace('-', ' ')
                
                for page_num, page in enumerate(pdf.pages, 1):
                    text = page.extract_text()
                    
                    if not text:
                        continue
                    
                    # Clean up the text
                    lines = text.split('\n')
                    current_text = []
                    
                    for line in lines:
                        line = line.strip()
                        if not line:
                            continue
                        
                        # Detect section headers (better pattern matching)
                        if self._is_section_header(line):
                            # Save previous section if exists
                            if current_text:
                                chunk_text = ' '.join(current_text)
                                if len(chunk_text) >= 50:
                                    chunk = {
                                        'text': chunk_text,
                                        'metadata': {
                                            'bill_name': bill_name,
                                            'page': page_num,
                                            'section': current_section,
                                            'source': pdf_path
                                        }
                                    }
                                    chunks.append(chunk)
                            
                            # Start new section
                            current_section = line[:150]
                            current_text = []
                        else:
                            current_text.append(line)
                        
                        # Create chunks every 10 lines or at page end
                        if len(current_text) >= 10:
                            chunk_text = ' '.join(current_text)
                            if len(chunk_text) >= 50:
                                chunk = {
                                    'text': chunk_text,
                                    'metadata': {
                                        'bill_name': bill_name,
                                        'page': page_num,
                                        'section': current_section,
                                        'source': pdf_path
                                    }
                                }
                                chunks.append(chunk)
                                current_text = []
                    
                    # Add remaining text from page
                    if current_text:
                        chunk_text = ' '.join(current_text)
                        if len(chunk_text) >= 50:
                            chunk = {
                                'text': chunk_text,
                                'metadata': {
                                    'bill_name': bill_name,
                                    'page': page_num,
                                    'section': current_section,
                                    'source': pdf_path
                                }
                            }
                            chunks.append(chunk)
        
        except Exception as e:
            print(f"Error parsing {pdf_path}: {str(e)}")
            raise
        
        return chunks
    
    def _is_section_header(self, line: str) -> bool:
        """Check if a line is likely a section header."""
        line_upper = line.upper()
        
        # Common section patterns in Nigerian bills
        section_indicators = [
            'PART', 'CHAPTER', 'SECTION', 'ARTICLE',
            'SCHEDULE', 'ARRANGEMENT OF SECTIONS',
            'INTERPRETATION', 'DEFINITIONS', 'REGULATIONS',
            'COMMENCEMENT', 'APPLICATION', 'ADMINISTRATION'
        ]
        
        # Check if line starts with section indicator
        for indicator in section_indicators:
            if line_upper.startswith(indicator):
                return True
        
        # Check for numbered sections like "25.", "1.", etc at start
        if re.match(r'^\d+\.?\s+[A-Z]', line):
            return True
        
        # Check for roman numerals
        if re.match(r'^[IVXLCDM]+\.?\s+', line):
            return True
        
        return False
    
    def extract_with_hierarchy(self, pdf_path: str) -> List[Dict[str, Any]]:
        """
        Extract document with full hierarchical structure.
        Enhanced version for better legal document parsing.
        """
        chunks = []
        current_section = "Preamble"
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                # Clean bill name
                bill_name = Path(pdf_path).stem.replace('HB.-', 'HB ').replace('-', ' ')
                
                for page_num, page in enumerate(pdf.pages, 1):
                    text = page.extract_text()
                    
                    if not text:
                        continue
                    
                    # Process line by line for better structure
                    lines = text.split('\n')
                    paragraph_buffer = []
                    
                    for line in lines:
                        line = line.strip()
                        
                        if not line:
                            continue
                        
                        # Check if this is a section header
                        if self._is_section_header(line):
                            # Save previous paragraph if exists
                            if paragraph_buffer:
                                para_text = ' '.join(paragraph_buffer)
                                if len(para_text) >= 50:
                                    chunk = {
                                        'text': para_text,
                                        'metadata': {
                                            'bill_name': bill_name,
                                            'page': page_num,
                                            'section': current_section,
                                            'source': pdf_path
                                        }
                                    }
                                    chunks.append(chunk)
                                paragraph_buffer = []
                            
                            # Update current section
                            current_section = line[:200]
                        else:
                            paragraph_buffer.append(line)
                            
                            # Create chunk if buffer gets large
                            if len(paragraph_buffer) >= 15:
                                para_text = ' '.join(paragraph_buffer)
                                chunk = {
                                    'text': para_text,
                                    'metadata': {
                                        'bill_name': bill_name,
                                        'page': page_num,
                                        'section': current_section,
                                        'source': pdf_path
                                    }
                                }
                                chunks.append(chunk)
                                paragraph_buffer = []
                    
                    # Save any remaining text from this page
                    if paragraph_buffer:
                        para_text = ' '.join(paragraph_buffer)
                        if len(para_text) >= 50:
                            chunk = {
                                'text': para_text,
                                'metadata': {
                                    'bill_name': bill_name,
                                    'page': page_num,
                                    'section': current_section,
                                    'source': pdf_path
                                }
                            }
                            chunks.append(chunk)
        
        except Exception as e:
            print(f"Error in hierarchical extraction for {pdf_path}: {str(e)}")
            # Fallback to simple extraction
            return self.extract_text_from_pdf(pdf_path)
        
        return chunks
    
    def _split_into_sections(self, text: str) -> List[Dict[str, Any]]:
        """Split text into logical sections."""
        sections = []
        current_text = []
        current_title = "Preamble"
        
        lines = text.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # Check if line is a section header
            if self.section_pattern.match(line) and len(line) < 150:
                # Save previous section
                if current_text:
                    sections.append({
                        'title': current_title,
                        'text': '\n'.join(current_text),
                        'id': self._generate_section_id(current_title)
                    })
                
                # Start new section
                current_title = line
                current_text = []
            else:
                current_text.append(line)
        
        # Add final section
        if current_text:
            sections.append({
                'title': current_title,
                'text': '\n'.join(current_text),
                'id': self._generate_section_id(current_title)
            })
        
        return sections
    
    def _generate_section_id(self, title: str) -> str:
        """Generate a clean section ID from title."""
        clean = re.sub(r'[^\w\s]', '', title.lower())
        clean = re.sub(r'\s+', '_', clean)
        return clean[:50]


def process_all_tax_bills(data_dir: str) -> List[Dict[str, Any]]:
    """
    Process all tax bill PDFs in the data directory.
    
    Args:
        data_dir: Directory containing PDF files
        
    Returns:
        List of all processed chunks from all bills
    """
    parser = TaxBillParser()
    all_chunks = []
    
    data_path = Path(data_dir)
    pdf_files = list(data_path.glob("*.pdf"))
    
    if not pdf_files:
        raise FileNotFoundError(f"No PDF files found in {data_dir}")
    
    print(f"Found {len(pdf_files)} PDF files to process...")
    
    for pdf_file in pdf_files:
        print(f"Processing: {pdf_file.name}")
        try:
            chunks = parser.extract_with_hierarchy(str(pdf_file))
            all_chunks.extend(chunks)
            print(f"  ✓ Extracted {len(chunks)} chunks")
        except Exception as e:
            print(f"  ✗ Error: {str(e)}")
            continue
    
    print(f"\nTotal chunks extracted: {len(all_chunks)}")
    return all_chunks