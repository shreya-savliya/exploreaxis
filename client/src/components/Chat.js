import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:5000/chat', { message: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = { sender: 'bot', text: 'Something went wrong, please try again.' };
            setMessages([...messages, newMessage, errorMessage]);
        }

        setInput('');
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: "80%", padding: "10px" }}
                />
                <button onClick={handleSendMessage} style={{ padding: "10px" }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
