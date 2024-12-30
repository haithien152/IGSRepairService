import React, { useState } from 'react';

const BoxChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, welcome to IGS repair service. How can I help you today?' }
  ]);

  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { id: messages.length + 1, text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');

      const assistantMessage = {
        id: messages.length + 2,
        textBefore: 'Please wait for us to connect you to our assistant. We will reply as soon as possible. Or you can ',
        linkText: 'click here',
        linkUrl: 'http://localhost:3000/query',
        textAfter: '. We will reply to you through email.'
      };

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }, 1000);
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1001
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  margin: '5px 0',
                  padding: '10px',
                  backgroundColor: message.id % 2 === 0 ? '#e0f7fa' : '#e3f2fd',
                  borderRadius: '8px',
                  alignSelf: message.id % 2 === 0 ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                {message.linkText ? (
                  <>
                    <span>{message.textBefore}</span>
                    <a
                      href={message.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'underline' }}
                    >
                      {message.linkText}
                    </a>
                    <span>{message.textAfter}</span>
                  </>
                ) : (
                  <span>{message.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              padding: '10px',
              borderTop: '1px solid #ddd'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px',
                marginRight: '10px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BoxChat;
