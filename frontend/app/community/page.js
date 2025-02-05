'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDarkMode } from "../context/DarkModeContext";

export default function CommunityPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchMessages(storedUserId);
    }
  }, []);

  const fetchMessages = async (currentUserId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://irix.onrender.com/api/messages?user-id=${currentUserId}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError('Please login to send messages');
      return;
    }
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('https://irix.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'user-id': userId,
          text: newMessage
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      // Fetch updated messages
      fetchMessages(userId);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className=" rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold  mb-6">Community Chat</h1>

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Messages List */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className=" rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-600">{message.user}</span>
                  <span className="text-sm ">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="">{message.text}</p>
              </div>
            ))}
          </div>

          {/* No Messages State */}
          {!loading && messages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No messages yet. Be the first to start the conversation!
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}