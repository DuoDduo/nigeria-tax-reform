import React, { useState, useEffect } from 'react';
import { Send, RefreshCw, AlertCircle, FileText, BookOpen, Scale, Info, ChevronDown, Menu, X, Bot, Phone, Mail, MapPin } from 'lucide-react';
import MessageList from './MessageList';
import { sendMessage, createConversation, clearConversation, checkHealth } from '../api/chatAPI';

/**
 * Government-standard website with integrated AI assistant
 */
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [systemStatus, setSystemStatus] = useState('checking');
  const [error, setError] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Check system health on mount
  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const health = await checkHealth();
        setSystemStatus(health.status);
        
        if (health.status === 'healthy') {
          const newConvId = await createConversation();
          setConversationId(newConvId);
        }
      } catch (err) {
        console.error('Health check failed:', err);
        setSystemStatus('error');
        setError('Failed to connect to server. Please ensure the backend is running.');
      }
    };

    checkSystemHealth();
  }, []);

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || input.trim();
    
    if (!textToSend || isLoading) return;
    if (systemStatus !== 'healthy') {
      setError('System is not ready. Please wait or refresh.');
      return;
    }

    setMessages(prev => [...prev, { type: 'user', content: textToSend }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(textToSend, conversationId);
      
      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);
      }

      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: response.answer,
          sources: response.sources,
          misconception_detected: response.misconception_detected,
          relatedQuestions: response.related_questions,
        },
      ]);
    } catch (err) {
      console.error('Error sending message:', err);
      
      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: err.response?.data?.detail || 'Sorry, I encountered an error. Please try again.',
          error: true,
        },
      ]);
      
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = async () => {
    if (conversationId) {
      await clearConversation(conversationId);
    }
    
    const newConvId = await createConversation();
    setConversationId(newConvId);
    setMessages([]);
    setError(null);
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  if (systemStatus === 'checking') {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Connecting to system...</p>
        </div>
      </div>
    );
  }

  if (systemStatus === 'error') {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <header className="bg-white border-b-4 border-green-600 shadow-md">
        <div className="bg-green-800 text-white py-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +234 700 TAXINFO
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                info@taxreform.gov.ng
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span>🇳🇬 Federal Republic of Nigeria</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Tax Reform Information Portal
                </h1>
                <p className="text-sm text-gray-600">Federal Ministry of Finance, Budget and National Planning</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#overview" className="text-gray-700 hover:text-green-700 font-medium">Overview</a>
              <a href="#bills" className="text-gray-700 hover:text-green-700 font-medium">The Bills</a>
              <a href="#faq" className="text-gray-700 hover:text-green-700 font-medium">FAQ</a>
              <a href="#resources" className="text-gray-700 hover:text-green-700 font-medium">Resources</a>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-3">
              <a href="#overview" className="text-gray-700 hover:text-green-700 font-medium">Overview</a>
              <a href="#bills" className="text-gray-700 hover:text-green-700 font-medium">The Bills</a>
              <a href="#faq" className="text-gray-700 hover:text-green-700 font-medium">FAQ</a>
              <a href="#resources" className="text-gray-700 hover:text-green-700 font-medium">Resources</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Understanding Nigeria's 2024 Tax Reform Bills
              </h2>
              <p className="text-lg mb-6 text-green-100">
                Get accurate, source-backed answers about how the tax reforms affect you. Our AI assistant helps you understand complex policy in simple terms.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowChatbot(true)}
                  className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  Ask AI Assistant
                </button>
                <a
                  href="#overview"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Key Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    <span>4 comprehensive tax reform bills passed by National Assembly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    <span>Takes effect January 1, 2026</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    <span>Small businesses under ₦50M exempt from corporate tax</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    <span>Fairer VAT distribution across all states</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <p className="text-lg text-gray-700 mb-4">
              The Nigerian Tax Reform Bills of 2024 represent a comprehensive modernization of the country's tax system. These reforms are designed to simplify taxation, support small businesses, and ensure fairer distribution of tax revenues across all states.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-green-900 mb-2">For Citizens</h3>
                <p className="text-gray-700 text-sm">Tax rates remain stable with clearer guidelines on what you owe</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-2">For Businesses</h3>
                <p className="text-gray-700 text-sm">Small businesses under ₦50M revenue pay zero corporate tax</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-purple-900 mb-2">For States</h3>
                <p className="text-gray-700 text-sm">VAT distributed more fairly based on consumption patterns</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Bills Section */}
        <section id="bills" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Four Bills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nigeria Tax Bill</h3>
                  <p className="text-gray-600 mb-3">Covers income tax, VAT, and other main taxes. Sets rates and rules for individuals and businesses.</p>
                  <a href="#" className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-1">
                    Read More <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tax Administration Bill</h3>
                  <p className="text-gray-600 mb-3">Explains how taxes are collected, managed, and disputes are resolved.</p>
                  <a href="#" className="text-blue-700 font-semibold hover:text-blue-800 inline-flex items-center gap-1">
                    Read More <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nigeria Revenue Service Bill</h3>
                  <p className="text-gray-600 mb-3">About the new tax collection agency (formerly FIRS) and its powers.</p>
                  <a href="#" className="text-purple-700 font-semibold hover:text-purple-800 inline-flex items-center gap-1">
                    Read More <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Joint Revenue Board Bill</h3>
                  <p className="text-gray-600 mb-3">How federal and state governments coordinate on tax matters.</p>
                  <a href="#" className="text-orange-700 font-semibold hover:text-orange-800 inline-flex items-center gap-1">
                    Read More <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md divide-y">
            {[
              { q: "When do these changes take effect?", a: "The tax reforms will take effect on January 1, 2026, giving everyone time to prepare." },
              { q: "Will my taxes increase?", a: "Most Nigerians will see no increase. Small business owners under ₦50M may actually pay less." },
              { q: "How does this affect small businesses?", a: "Small businesses earning under ₦50 million per year are exempt from corporate income tax." },
              { q: "What is changing about VAT?", a: "VAT rate stays at 7.5%, but distribution among states becomes fairer based on consumption." }
            ].map((item, idx) => (
              <details key={idx} className="p-6 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-gray-900 flex items-center justify-between">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowChatbot(true)}
              className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-2"
            >
              <Bot className="w-5 h-5" />
              Ask AI Assistant for More Answers
            </button>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources & Downloads</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <FileText className="w-10 h-10 text-green-700 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Official Bills (PDF)</h3>
              <p className="text-gray-600 text-sm mb-4">Download the complete text of all four bills</p>
              <button className="text-green-700 font-semibold hover:text-green-800">Download →</button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <Info className="w-10 h-10 text-blue-700 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Citizen's Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Simplified explanations for everyday Nigerians</p>
              <button className="text-blue-700 font-semibold hover:text-blue-800">Download →</button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <BookOpen className="w-10 h-10 text-purple-700 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Business Guide</h3>
              <p className="text-gray-600 text-sm mb-4">How the reforms affect your business</p>
              <button className="text-purple-700 font-semibold hover:text-purple-800">Download →</button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-2"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Ask AI Assistant</span>
        </button>
      )}

      {/* AI Assistant Modal/Panel */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-4xl md:h-[600px] h-[80vh] flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">AI Tax Assistant</h3>
                  <p className="text-xs text-green-100">Ask me anything about the tax reforms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewConversation}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="New Conversation"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center gap-2 text-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-hidden bg-gray-50">
              <MessageList
                messages={messages}
                isLoading={isLoading}
                onSuggestedQuestion={handleSuggestedQuestion}
              />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about tax rates, VAT, small businesses..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                    rows="2"
                    disabled={isLoading || systemStatus !== 'healthy'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Press Enter to send • Powered by AI
                  </p>
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading || systemStatus !== 'healthy'}
                  className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 h-fit"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden md:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#overview" className="hover:text-white">Overview</a></li>
                <li><a href="#bills" className="hover:text-white">The Bills</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><a href="#resources" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +234 700 TAXINFO
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@taxreform.gov.ng
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Abuja, Nigeria
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Related Agencies</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">FIRS</a></li>
                <li><a href="#" className="hover:text-white">Ministry of Finance</a></li>
                <li><a href="#" className="hover:text-white">National Assembly</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 Federal Republic of Nigeria. All rights reserved.</p>
            <p className="text-sm mt-2">Tax Reform Information Portal - Built with AI Technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;