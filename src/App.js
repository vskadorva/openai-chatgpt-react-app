import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const OpenAIChat = () => {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setConversation((prevConversation) => [...prevConversation, { role: 'user', content: input }]);
  const res = await axios.post('/api/create-chat-completion', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  });
  setConversation((prevConversation) => [
    ...prevConversation,
    { role: 'ai', content: res.data.choices[0].message.content },
  ]);
  setInput('');
};

  const clearConversation = () => {
    setConversation([]);
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={clearConversation}>Clear Conversation</button>
    </div>
  );
};

export default OpenAIChat;
