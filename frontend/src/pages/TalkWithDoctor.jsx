import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import ChatSidebar from '../components/ChatSidebar';
import { API_BASE_URL } from '../config';
import { 
  Bot, 
  User, 
  Send, 
  Plus, 
  Menu, 
  X, 
  Sparkles, 
  Stethoscope, 
  Heart, 
  Pill, 
  Activity,
  ShieldCheck
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "আমার ২ দিন ধরে জ্বর ও গায়ে ব্যথা, কি করবো?",
  "মাইগ্রেনের ব্যথা কমানোর সহজ উপায় কি?",
  "ভিটামিন ডি ঘাটতির লক্ষণগুলো কি কি?",
  "উচ্চ রক্তচাপ নিয়ন্ত্রণে রাখার প্রাকৃতিক উপায়"
];

const TalkWithDoctor = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        loadChatHistory();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async () => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get(`${API_BASE_URL}/api/health/chat-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const token = await user.getIdToken();
      const response = await axios.get(`${API_BASE_URL}/api/health/chat-sessions/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
  };

  const handleNewChat = () => {
    setSelectedChatId(null);
    setMessages([]);
  };

  const sendMessage = async (customMsg) => {
    const textToSend = customMsg || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customMsg) setInputMessage('');
    setLoading(true);

    try {
      const token = await user.getIdToken();
      const response = await axios.post(`${API_BASE_URL}/api/health/chat`, {
        message: textToSend,
        sessionId: selectedChatId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'দুঃখিত, প্রযুক্তিগত সমস্যার কারণে আপনার উত্তর প্রক্রিয়াজাত করা যায়নি। আবার চেষ্টা করুন।',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) {
    return (
      <div className="container py-5 text-center font-display">
        <div className="glass-panel p-5 mx-auto box-glow" style={{ maxWidth: '420px' }}>
          <Stethoscope size={48} className="text-emerald-400 mb-3" style={{ color: '#10b981' }} />
          <h4 className="fw-bold text-white mb-2">লগইন প্রয়োজন</h4>
          <p className="text-muted small mb-4">AI ডাক্তারের সাথে লাইভ কথা বলতে আপনার একাউন্টে সাইন ইন করুন।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex font-display" style={{ height: 'calc(100vh - 64px)', backgroundColor: 'var(--color-paper)', overflow: 'hidden' }}>
      
      {/* Sidebar Desktop/Mobile */}
      <div className={`${showSidebar ? 'd-block' : 'd-none d-md-block'} h-100 flex-shrink-0`}>
        <ChatSidebar
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
          onNewChat={handleNewChat}
        />
      </div>

      {/* Main Consultation Room */}
      <div className="flex-grow-1 d-flex flex-column h-100" style={{ position: 'relative' }}>
        
        {/* Chat Room Top Bar */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ 
          backgroundColor: 'var(--color-paper-surface)',
          borderColor: 'var(--color-rule)' 
        }}>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-glass p-2 border-0"
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Sidebar"
            >
              {showSidebar ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="d-flex align-items-center gap-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center box-glow"
                style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#022c22' }}
              >
                <Bot size={22} />
              </div>
              <div>
                <h6 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                  AI স্বাস্থ্য ডাক্তার (Health Specialist)
                  <span className="badge-emerald" style={{ fontSize: '0.65rem' }}>অনলাইন ২৪/৭</span>
                </h6>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  আপনার স্বাস্থ্যগত প্রশ্ন ও সমস্যার তাৎক্ষণিক চিকিৎসা পরামর্শ
                </small>
              </div>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="btn btn-glass btn-sm d-flex align-items-center gap-1 rounded-pill"
          >
            <Plus size={16} />
            <span className="d-none d-sm-inline">নতুন সেশন</span>
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-grow-1 overflow-auto p-3 p-md-4 d-flex flex-column gap-3">
          {messages.length === 0 ? (
            <div className="my-auto mx-auto text-center" style={{ maxWidth: '640px' }}>
              <div className="glass-panel p-4 p-md-5 box-glow text-start">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Stethoscope size={32} />
                  </div>
                  <div>
                    <h4 className="fw-bold text-white mb-1">স্বাগতম! আমি আপনার AI হেলথ ডক্টর</h4>
                    <p className="text-muted small mb-0">শারীরিক সমস্যা, ঔষধ, খাদ্যাভ্যাস বা জীবনধারা সংক্রান্ত যে কোন প্রশ্ন করতে পারেন।</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold text-white small mb-3 d-flex align-items-center gap-2">
                    <Sparkles size={16} className="text-emerald-400" style={{ color: '#10b981' }} />
                    দ্রুত প্রশ্ন নির্বাচন করুন (Suggested Topics):
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(prompt)}
                        className="btn border-0 text-start p-3 rounded-xl transition-all font-display text-light d-flex align-items-center justify-content-between"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--color-rule)' }}
                      >
                        <span className="small">{prompt}</span>
                        <Send size={14} className="text-emerald-400 flex-shrink-0" style={{ color: '#10b981' }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.8rem' }}>
                  <ShieldCheck size={18} className="flex-shrink-0" />
                  <span>মনোযোগ দিন: এটি একটি AI চিকিৎসা সহায়ক। গুরুতর বা জরুরি পরিস্থিতিতে সরাসরি বিশেষজ্ঞ ডাক্তার দেখান।</span>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={index} className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className="d-flex gap-2" style={{ maxWidth: '82%' }}>
                    {!isUser && (
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                        style={{ width: '34px', height: '34px', backgroundColor: '#10b981', color: '#022c22' }}
                      >
                        <Bot size={18} />
                      </div>
                    )}

                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)' }}>
                        <span className="fw-semibold">{isUser ? 'আপনি' : 'AI ডক্টর'}</span>
                        <span>•</span>
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>

                      <div className={`p-3 rounded-2xl ${
                        isUser 
                          ? 'bg-emerald-grad text-dark shadow-sm' 
                          : 'glass-card border-0 text-light'
                      }`} style={{
                        background: isUser ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(22, 36, 32, 0.85)',
                        color: isUser ? '#022c22' : 'var(--color-ink)',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.6',
                        fontSize: '0.92rem'
                      }}>
                        {msg.content}
                      </div>
                    </div>

                    {isUser && (
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                        style={{ width: '34px', height: '34px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#34d399' }}
                      >
                        <User size={18} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {loading && (
            <div className="d-flex justify-content-start">
              <div className="d-flex gap-2 align-items-center p-3 rounded-2xl glass-card border-0">
                <Bot size={18} className="text-emerald-400 animate-spin" style={{ color: '#10b981' }} />
                <span className="small text-muted">ডাক্তার উত্তর লিখছেন...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-top" style={{ backgroundColor: 'var(--color-paper-surface)', borderColor: 'var(--color-rule)' }}>
          <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control-dark font-display flex-grow-1"
              placeholder="আপনার প্রশ্ন বা লক্ষণ বিস্তারিত লিখুন..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="btn-emerald py-25 px-4 rounded-xl font-display flex-shrink-0"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
              ) : (
                <div className="d-flex align-items-center gap-1">
                  <span>পাঠান</span>
                  <Send size={16} />
                </div>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default TalkWithDoctor;
