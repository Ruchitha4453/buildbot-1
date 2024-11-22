import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Together from 'together-ai'; // Import Together AI

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatProps {
  activeFile: string | null;
  getFileExplanation: () => string; // Function to get explanation
}

export const Chat: React.FC<ChatProps> = ({ activeFile, getFileExplanation }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Together AI with your API key
  const together = new Together({ apiKey:"8de0e9a10d32d13dbefc4ec10923f16fd41c676192b860cd32d7d7cd6b7c6827"});

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
    }
  };

  // Function to send messages to AI
  const sendMessage = async (messageContent: string) => {
    const newUserMessage: Message = { role: 'user', content: messageContent };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput('');

    // Set loading state
    setLoading(true);

    try {
      // Check if the message contains "explain" and there is an active file
      if (/explain/i.test(messageContent) && activeFile) {
        const explanation = getFileExplanation(); // Get explanation for the active file
        const aiResponse: Message = { 
          role: 'assistant', 
          content: explanation 
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        // Call Together AI API for normal conversation
        const response = await together.chat.completions.create({
          messages: [{ role: 'user', content: messageContent }],
          model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        });

        const aiResponseContent =
          response.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";

        const aiResponse: Message = { 
          role: 'assistant', 
          content: aiResponseContent 
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className={`p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label="Send message"
          disabled={loading}
        >
          {loading ? (
            <span>Loading...</span> // Optional loading indicator
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};