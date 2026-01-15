import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, Bot, AlertCircle, Menu, History, 
  MessageSquare, LogOut, ChevronRight, Trash2, 
  ShieldCheck, Sparkles, Landmark, FileText, Scale 
} from 'lucide-react';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import {
  sendMessage,
  createConversation,
  getConversations,
  deleteConversation,
  getConversationMessages,
  // Ensure your API file has an updateConversationTitle if you use the auto-title logic
} from '../api/chatAPI';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // State Management
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const messagesEndRef = useRef(null);

  /** * Scroll Management 
   */
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /** * Initial Load 
   */
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data || []);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  };

  const fetchMessages = async (convId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getConversationMessages(convId);
      const mappedMessages = data.messages.map(msg => ({
        type: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
        sources: msg.sources,
        misconception_detected: msg.misconception_detected,
        relatedQuestions: msg.related_questions
      }));
      setMessages(mappedMessages);
    } catch (err) {
      setError('Could not retrieve previous messages.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateTitleFromMessage = (text) => {
    return text
      .replace(/\n/g, ' ')
      .slice(0, 60)
      .trim() + (text.length > 60 ? '…' : '');
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    setMessages(prev => [...prev, { type: 'user', content: messageText }]);
    setIsLoading(true);
    setError(null);

    try {
      let currentId = conversationId;
      let isNewConversation = false;

      if (!currentId) {
        const newConv = await createConversation();
        currentId = newConv.conversation_id;
        setConversationId(currentId);
        isNewConversation = true;
      }

      const response = await sendMessage(messageText, currentId);

      // Note: If you have a specific endpoint for updateConversationTitle, 
      // you can call it here as per your original logic.
      
      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: response.answer,
          sources: response.sources,
          misconception_detected: response.misconception_detected,
          relatedQuestions: response.related_questions
        }
      ]);

      fetchConversations();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to connect to TaxEase AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setConversationId(null);
    setMessages([]);
    setError(null);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleSelectConversation = async (conv) => {
    setConversationId(conv.id);
    await fetchMessages(conv.id);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleRequestDelete = (e, conv) => {
    e.stopPropagation();
    setDeleteTarget(conv);
  };

  const confirmDeleteConversation = async () => {
    if (!deleteTarget) return;

    try {
      await deleteConversation(deleteTarget.id);
      await fetchConversations();

      if (deleteTarget.id === conversationId) {
        handleNewConversation();
      }
    } catch {
      setError('Failed to delete conversation.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0a1a14]/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Section - Federal Deep Green */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-[#0a1a14] text-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Logo & Branding */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
            alt="Coat of Arms" 
            className="w-10 h-10"
          />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter uppercase leading-none">TaxEase <span className="text-[#A88948]">AI</span></span>
            <span className="text-[9px] font-bold text-green-400/70 uppercase tracking-widest mt-1">Official Portal</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center justify-center gap-2 bg-[#008751] hover:bg-[#00643d] text-white py-4 px-4 rounded-xl transition-all font-bold shadow-lg shadow-black/20 active:scale-95 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span className="text-xs uppercase tracking-widest">New Consultation</span>
          </button>
        </div>

        {/* History List */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          <div className="px-4 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            Consultation History
          </div>
          
          {conversations.length === 0 ? (
            <div className="px-4 py-10 text-center opacity-20">
              <History className="w-10 h-10 mx-auto mb-2 text-white" />
              <p className="text-xs font-bold uppercase tracking-widest">No Sessions Found</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === conversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl 
                    transition-all group cursor-pointer relative mb-1 border
                    ${isActive 
                      ? 'bg-white/10 text-white border-white/10 shadow-sm' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <MessageSquare
                      size={16}
                      className={isActive ? 'text-[#A88948]' : 'opacity-20'}
                    />
                    <span className="truncate text-xs font-bold uppercase tracking-tight leading-none">
                      {conv.title || 'Untitled Session'}
                    </span>
                  </div>

                  <div className="flex items-center shrink-0">
                    <button
                      onClick={(e) => handleRequestDelete(e, conv)}
                      className="p-1.5 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400/70 hover:text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronRight
                      size={14}
                      className={`text-white/30 hidden md:block transition-transform ${
                        isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-xl md:hidden text-gray-600"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-gray-900 uppercase tracking-tight">AI Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Database Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-[#A88948] bg-[#A88948]/5 px-3 py-1.5 rounded-lg border border-[#A88948]/10 uppercase tracking-widest">
                <ShieldCheck size={12} /> SECURE PORTAL
             </div>
          </div>
        </header>

        {/* Global Error Alert */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-800 animate-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <p className="text-xs font-bold flex-1">
              {typeof error === 'object' ? (error.detail || error.message || JSON.stringify(error)) : error}
            </p>
            <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Messaging Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
             {messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in fade-in duration-700">
                 <div className="w-20 h-20 bg-[#008751]/10 rounded-[2rem] flex items-center justify-center mb-6">
                   <Bot size={40} className="text-[#008751]" />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">TaxEase Intelligence</h2>
                 <p className="text-gray-500 max-w-sm font-medium mb-8">Access verified data on the 2024-2026 Nigerian Tax Reforms.</p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
  {[
    { icon: Sparkles, text: "How will the 2026 reforms affect VAT?" },
    { icon: Landmark, text: "Exemptions for SMEs under ₦50M turnover." },
    { icon: FileText, text: "What is the Nigeria Revenue Service Bill?" },
    { icon: Scale, text: "How are tax disputes resolved under the new bill?" },
  ].map((item, idx) => (
    <button 
      key={idx} 
      onClick={() => handleSendMessage(item.text)} 
      className="p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#008751] hover:shadow-lg transition-all text-xs font-bold flex items-center gap-3 group"
    >
      <item.icon size={16} className="text-[#A88948] group-hover:scale-110 transition-transform" />
      <span className="leading-tight">{item.text}</span>
    </button>
  ))}
</div>
               </div>
             ) : (
               <>
                 <MessageList 
                    messages={messages} 
                    isLoading={isLoading} 
                    onSuggestedQuestion={handleSendMessage} 
                 />
                 <div ref={messagesEndRef} className="h-4" />
               </>
             )}
          </div>
        </main>

        {/* Input Bar Section */}
        <footer className="bg-white border-t border-gray-100 p-4 md:p-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-full">
               <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-gray-400">
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#008751]">OFFICIAL DISCLAIMER:</span>
               <span className="text-[9px] font-bold text-gray-300 uppercase leading-none">Consult a legal expert for formal filings.</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a1a14]/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
              <Trash2 className="text-red-500" size={30} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Delete Session?</h3>
            <p className="text-sm text-gray-500 mb-8 font-medium italic">
              "This will permanently erase your consultation regarding <strong>{deleteTarget.title || 'this topic'}</strong>."
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-gray-50 text-gray-400 hover:bg-gray-100 transition">Cancel</button>
              <button onClick={confirmDeleteConversation} className="flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 transition">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;