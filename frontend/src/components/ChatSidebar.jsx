import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { MessageSquare, Plus, Calendar, Clock, ChevronRight, Bot } from 'lucide-react';

const ChatSidebar = ({ onSelectChat, selectedChatId, onNewChat }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      loadChatHistory();
    }
  }, [auth.currentUser]);

  const loadChatHistory = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get(`${API_BASE_URL}/api/health/chat-sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(response.data || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'আজ (Today)';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'গতকাল';
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateMessage = (message, maxLength = 32) => {
    if (!message) return 'নতুন চ্যাট';
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  return (
    <div 
      className="d-flex flex-column h-100 font-display border-end" 
      style={{ 
        width: '300px', 
        backgroundColor: 'var(--color-paper-surface)',
        borderColor: 'var(--color-rule) !important'
      }}
    >
      {/* Header & New Chat Button */}
      <div className="p-3 border-bottom" style={{ borderColor: 'var(--color-rule)' }}>
        <button 
          onClick={onNewChat}
          className="btn-emerald w-100 py-25 rounded-xl font-display text-center gap-2 box-glow"
          style={{ fontSize: '0.9rem' }}
        >
          <Plus size={18} />
          <span>নতুন চ্যাট শুরু করুন</span>
        </button>
      </div>

      {/* Chat Session List */}
      <div className="flex-grow-1 overflow-auto p-2">
        <div className="px-2 py-2 text-uppercase text-muted font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          কথোপকথনের ইতিহাস ({chatHistory.length})
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border spinner-border-sm text-emerald" style={{ color: '#10b981' }} role="status"></div>
            <p className="small text-muted mt-2 mb-0">হিস্টোরি লোড হচ্ছে...</p>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="p-4 text-center text-muted">
            <Bot size={32} className="mb-2 opacity-40 text-emerald-400" />
            <p className="small mb-0">এখনো কোন সংরক্ষিত চ্যাট নেই।</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-1">
            {chatHistory.map((chat) => {
              const isSelected = selectedChatId === chat._id;
              return (
                <button
                  key={chat._id}
                  onClick={() => onSelectChat(chat._id)}
                  className="btn border-0 text-start w-100 p-25 rounded-xl transition-all d-flex align-items-center justify-content-between gap-2"
                  style={{
                    backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                    border: isSelected ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                    color: isSelected ? '#34d399' : 'var(--color-ink)'
                  }}
                >
                  <div className="d-flex align-items-center gap-2 text-truncate">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        backgroundColor: isSelected ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#022c22' : '#10b981'
                      }}
                    >
                      <MessageSquare size={15} />
                    </div>
                    <div className="text-truncate">
                      <div className="fw-semibold text-truncate" style={{ fontSize: '0.85rem' }}>
                        {truncateMessage(chat.title)}
                      </div>
                      <div className="small text-muted" style={{ fontSize: '0.72rem' }}>
                        {formatDate(chat.createdAt)}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-muted opacity-50 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
