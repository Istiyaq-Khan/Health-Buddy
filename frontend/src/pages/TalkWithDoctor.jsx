import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import ChatSidebar from '../components/ChatSidebar';

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
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async () => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get('https://health-buddy-backend-gigy.onrender.com/api/health/chat-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);
    try {
      const token = await user.getIdToken();
      const response = await axios.get(`https://health-buddy-backend-gigy.onrender.com/api/health/chat-sessions/${chatId}`, {
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const token = await user.getIdToken();
      const response = await axios.post('https://health-buddy-backend-gigy.onrender.com/api/health/chat', {
        message: inputMessage,
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
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="card border-warning">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">🔒 Authentication Required</h4>
          </div>
          <div className="card-body">
            <p className="mb-3">Please log in to chat with the AI doctor.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex h-100" style={{ height: 'calc(100vh - 76px)' }}>
      {/* Sidebar */}
      {showSidebar && (
        <ChatSidebar
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
          onNewChat={handleNewChat}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <div className="bg-success text-white p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light btn-sm me-3"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                ☰
              </button>
              <div className="me-3">
                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '40px', height: '40px' }}>
                  <span className="text-success fw-bold">🤖</span>
                </div>
              </div>
              <div>
                <h5 className="mb-0">AI Health Doctor</h5>
                <small>Ask me about your health problems and I'll help you with solutions and daily routines</small>
              </div>
            </div>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleNewChat}
            >
              + New Chat
            </button>
          </div>
        </div>

      {/* Messages Container */}
      <div className="flex-grow-1 bg-light overflow-auto p-3" style={{ height: 'calc(100vh - 200px)' }}>
        {messages.length === 0 ? (
          <div className="text-center mt-5">
            <div className="bg-white rounded p-4 shadow-sm">
              <h4 className="text-success mb-3">👨‍⚕️ Welcome to AI Health Assistant</h4>
              <p className="text-muted mb-4">
                I'm here to help you with your health concerns. Ask me anything about:
              </p>
              <div className="row text-start">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">🏥 Health problems and symptoms</li>
                    <li className="mb-2">💊 Medication advice</li>
                    <li className="mb-2">🥗 Diet and nutrition</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">🏃‍♂️ Exercise routines</li>
                    <li className="mb-2">😴 Sleep and lifestyle</li>
                    <li className="mb-2">📅 Daily health routines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {messages.map((message, index) => (
              <div key={index} className={`d-flex ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`max-w-75 ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded p-3 ${message.role === 'user' ? 'bg-success text-white' : 'bg-white shadow-sm'}`}>
                    <div className="d-flex align-items-start gap-2">
                      {message.role === 'assistant' && (
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                             style={{ width: '32px', height: '32px' }}>
                          <span className="text-white">🤖</span>
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <div className="mb-1">
                          <small className={`${message.role === 'user' ? 'text-white-50' : 'text-muted'}`}>
                            {message.role === 'user' ? 'You' : 'AI Assistant'} • {formatTime(message.timestamp)}
                          </small>
                        </div>
                        <div className={`${message.role === 'user' ? 'text-white' : 'text-dark'}`}>
                          {message.content}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                             style={{ width: '32px', height: '32px' }}>
                          <span className="text-success">👤</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start">
                <div className="bg-white rounded p-3 shadow-sm">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '32px', height: '32px' }}>
                      <span className="text-white">🤖</span>
                    </div>
                    <div>
                      <small className="text-muted">AI Assistant • typing</small>
                      <div className="d-flex gap-1 mt-1">
                        <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite' }}></div>
                        <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite 0.2s' }}></div>
                        <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px', animation: 'bounce 1.4s infinite 0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

        {/* Messages Container */}
        

        {/* Input Form */}
        <div className="bg-white border-top p-3">
          <form onSubmit={sendMessage} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Ask me about your health problem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-success px-4"
              disabled={loading || !inputMessage.trim()}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        .max-w-75 {
          max-width: 75%;
        }
      `}</style>
    </div>
  );
};

export default TalkWithDoctor; 
