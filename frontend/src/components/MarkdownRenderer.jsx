import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Hallmark-styled Markdown Renderer for AI Doctor Chat & Health Assistant
 */
const MarkdownRenderer = ({ content, isUser = false }) => {
  if (!content) return null;

  return (
    <div className={`markdown-content ${isUser ? 'markdown-user' : 'markdown-assistant'}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h5 
              className="fw-bold mt-3 mb-2 pb-1 border-bottom d-flex align-items-center gap-2"
              style={{ color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.25)', fontSize: '1.15rem' }} 
              {...props} 
            />
          ),
          h2: ({ node, ...props }) => (
            <h6 
              className="fw-bold mt-3 mb-2 d-flex align-items-center gap-2"
              style={{ color: '#34d399', fontSize: '1.05rem' }} 
              {...props} 
            />
          ),
          h3: ({ node, ...props }) => (
            <h6 
              className="fw-semibold mt-2 mb-1"
              style={{ color: '#a7f3d0', fontSize: '0.98rem' }} 
              {...props} 
            />
          ),
          p: ({ node, ...props }) => (
            <p 
              className="mb-2" 
              style={{ lineHeight: '1.65', color: isUser ? '#022c22' : '#e2e8f0' }} 
              {...props} 
            />
          ),
          strong: ({ node, ...props }) => (
            <strong 
              style={{ 
                color: isUser ? '#022c22' : '#6ee7b7', 
                fontWeight: '700' 
              }} 
              {...props} 
            />
          ),
          ul: ({ node, ...props }) => (
            <ul 
              className="ps-3 mb-2.5" 
              style={{ listStyleType: 'none', paddingLeft: '0.5rem' }} 
              {...props} 
            />
          ),
          ol: ({ node, ...props }) => (
            <ol 
              className="ps-3 mb-2.5" 
              style={{ color: isUser ? '#022c22' : '#cbd5e1' }} 
              {...props} 
            />
          ),
          li: ({ node, ...props }) => (
            <li 
              className="mb-1.5 d-flex align-items-start gap-2" 
              style={{ lineHeight: '1.6' }}
            >
              {!isUser && (
                <span 
                  className="mt-1 flex-shrink-0 rounded-circle" 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#10b981', 
                    display: 'inline-block' 
                  }} 
                />
              )}
              <span className="flex-grow-1">{props.children}</span>
            </li>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="p-3 my-2 rounded-xl"
              style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.08)', 
                borderLeft: '4px solid #10b981',
                color: '#a7f3d0',
                fontStyle: 'italic'
              }}
              {...props}
            />
          ),
          code: ({ node, inline, ...props }) => (
            inline ? (
              <code 
                className="px-1.5 py-0.5 rounded font-monospace"
                style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                  color: '#34d399',
                  fontSize: '0.85em'
                }}
                {...props}
              />
            ) : (
              <pre 
                className="p-3 rounded-xl overflow-x-auto my-2"
                style={{ 
                  backgroundColor: '#09100e', 
                  border: '1px solid rgba(45, 80, 68, 0.4)',
                  color: '#e2e8f0',
                  fontSize: '0.85em'
                }}
                {...props}
              />
            )
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
