import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

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
      const response = await axios.get('https://health-buddy-backend-gigy.onrender.com/api/health/chat-sessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  if (loading) {
    return (
      <div className="bg-dark border-end" style={{ width: '280px', height: '100vh' }}>
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0 text-success">💬 Chat History</h6>
            <button 
              className="btn btn-success btn-sm"
              onClick={onNewChat}
            >
              + New Chat
            </button>
          </div>
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark border-end d-flex flex-column" style={{ width: '280px', height: '100vh' }}>
      <div className="p-3 border-bottom border-success">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 text-success">💬 Chat History</h6>
          <button 
            className="btn btn-success btn-sm"
            onClick={onNewChat}
          >
            + New Chat
          </button>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto">
        {chatHistory.length === 0 ? (
          <div className="p-3 text-center">
            <div className="text-muted">
              <p className="mb-2 text-light">No chat history yet</p>
              <small className="text-secondary">Start a new conversation to see it here</small>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {chatHistory.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item p-2 rounded mb-1 cursor-pointer ${
                  selectedChatId === chat._id ? 'bg-success text-white' : 'bg-secondary-subtle text-light'
                }`}
                onClick={() => onSelectChat(chat._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                      selectedChatId === chat._id ? 'bg-white' : 'bg-success'
                    }`} style={{ width: '24px', height: '24px' }}>
                      <span className={`${selectedChatId === chat._id ? 'text-success' : 'text-white'}`} style={{ fontSize: '12px' }}>
                        💬
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className={`fw-bold ${selectedChatId === chat._id ? 'text-dark' : 'text-dark'}`}>
                      {truncateMessage(chat.title || 'Health Chat')}
                    </div>
                    <div className={`small ${selectedChatId === chat._id ? 'text-white-50' : 'text-dark'}`}>
                      {formatDate(chat.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
