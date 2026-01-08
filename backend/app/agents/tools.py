"""
Agent tools for enhanced capabilities.
"""
from typing import Dict, Any, List
from langchain_core.tools import Tool, tool
from langchain_core.documents import Document

class TaxCalculatorTool:
    """Tool for tax-related calculations."""
    
    @staticmethod
    def calculate_vat_derivation(state_consumption: float, total_consumption: float) -> Dict[str, Any]:
        """
        Calculate VAT derivation based on consumption.
        
        Args:
            state_consumption: State's consumption amount
            total_consumption: Total national consumption
            
        Returns:
            Dictionary with calculation results
        """
        if total_consumption == 0:
            return {'error': 'Total consumption cannot be zero'}
        
        derivation_percentage = (state_consumption / total_consumption) * 100
        
        return {
            'state_consumption': state_consumption,
            'total_consumption': total_consumption,
            'derivation_percentage': round(derivation_percentage, 2),
            'explanation': f'State would receive {derivation_percentage:.2f}% of VAT revenue based on consumption'
        }
    
    @staticmethod
    def estimate_income_tax(annual_income: float) -> Dict[str, Any]:
        """
        Estimate income tax based on progressive rates.
        Note: This is a simplified calculation for demonstration.
        
        Args:
            annual_income: Annual income in Naira
            
        Returns:
            Dictionary with tax calculation
        """
        # Simplified progressive tax brackets (example rates)
        brackets = [
            (300000, 0.07),    # First 300k at 7%
            (300000, 0.11),    # Next 300k at 11%
            (500000, 0.15),    # Next 500k at 15%
            (500000, 0.19),    # Next 500k at 19%
            (1600000, 0.21),   # Next 1.6M at 21%
            (float('inf'), 0.24)  # Above 3.2M at 24%
        ]
        
        tax = 0
        remaining = annual_income
        
        for bracket_limit, rate in brackets:
            if remaining <= 0:
                break
            
            taxable = min(remaining, bracket_limit)
            tax += taxable * rate
            remaining -= taxable
        
        return {
            'annual_income': annual_income,
            'estimated_tax': round(tax, 2),
            'effective_rate': round((tax / annual_income * 100) if annual_income > 0 else 0, 2),
            'note': 'This is a simplified calculation. Actual tax may vary based on reliefs and allowances.'
        }


class MisconceptionDetector:
    """Detect and clarify common misconceptions."""
    
    # Common misconceptions about the tax reforms
    MISCONCEPTIONS = {
        '50% tax': {
            'truth': 'The highest income tax rate remains 24%, not 50%. This is a misconception.',
            'context': 'Progressive tax rates apply to different income brackets, not your entire income.'
        },
        'north destruction': {
            'truth': 'The VAT derivation formula includes consumption, headquarters location, and equality components to ensure fairness.',
            'context': 'All states receive base allocation plus derivation based on economic activity.'
        },
        'small business collapse': {
            'truth': 'Small businesses with turnover below ₦50 million are exempt from many new requirements.',
            'context': 'The reforms include specific protections for small and medium enterprises.'
        },
        'immediate effect': {
            'truth': 'The reforms take effect on January 1, 2026, giving businesses and individuals time to prepare.',
            'context': 'There is a transition period for implementation.'
        }
    }
    
    @staticmethod
    def detect_misconception(query: str) -> Dict[str, Any]:
        """
        Detect if query contains common misconceptions.
        
        Args:
            query: User query
            
        Returns:
            Dictionary with misconception info if detected
        """
        query_lower = query.lower()
        
        for key, info in MisconceptionDetector.MISCONCEPTIONS.items():
            if key.replace(' ', '') in query_lower.replace(' ', ''):
                return {
                    'misconception_detected': True,
                    'misconception_type': key,
                    'truth': info['truth'],
                    'context': info['context']
                }
        
        return {'misconception_detected': False}


class SourceFormatter:
    """Format sources for clear citation."""
    
    @staticmethod
    def format_citations(sources: List[Dict[str, Any]]) -> str:
        """
        Format source citations for inclusion in responses.
        
        Args:
            sources: List of source dictionaries
            
        Returns:
            Formatted citation string
        """
        if not sources:
            return ""
        
        citations = []
        for idx, source in enumerate(sources, 1):
            citation = (
                f"[{idx}] {source['bill_name']} - "
                f"Section: {source['section']}, "
                f"Page: {source['page']}"
            )
            citations.append(citation)
        
        return "\n".join(citations)
    
    @staticmethod
    def create_source_references(documents: List[Document]) -> List[Dict[str, str]]:
        """
        Create structured source references from documents.
        
        Args:
            documents: Retrieved documents
            
        Returns:
            List of source reference dictionaries
        """
        references = []
        seen = set()
        
        for doc in documents:
            metadata = doc.metadata
            
            # Clean bill name
            bill_name = metadata.get('bill_name', 'Unknown Bill')
            if 'HB.-' in bill_name:
                bill_name = bill_name.replace('HB.-', 'HB ').replace('-', ' ')
            
            # Get section and page with defaults
            section = metadata.get('section', 'General Provisions')
            page = metadata.get('page', 'Referenced')
            
            # Convert to strings and handle None/N/A
            if not section or section == 'N/A':
                section = 'General Provisions'
            if not page or page == 'N/A':
                page = 'Referenced'
            
            section = str(section)
            page = str(page)
            
            key = f"{bill_name}_{section}_{page}"
            
            if key not in seen:
                references.append({
                    'bill_name': bill_name,
                    'section': section,
                    'page': page,
                    'excerpt': doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
                })
                seen.add(key)
        
        return references


def create_agent_tools(vectorstore=None) -> List[Tool]:
    """
    Create tools for the agent to use.
    
    Args:
        vectorstore: Vector store instance
        
    Returns:
        List of LangChain tools
    """
    calculator = TaxCalculatorTool()
    
    tools = [
        Tool(
            name="calculate_vat_derivation",
            func=lambda params: calculator.calculate_vat_derivation(**params),
            description="Calculate VAT derivation percentage for a state based on consumption data"
        ),
        Tool(
            name="estimate_income_tax",
            func=lambda income: calculator.estimate_income_tax(income),
            description="Estimate income tax for a given annual income amount"
        ),
    ]
    
    return tools