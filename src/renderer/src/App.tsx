import React, { useState } from 'react'
import MainContent from './components/MainContent'
import { ChatHomePage } from './components/ChatHomePage';


export type Message = { 
  role: 'user' | 'assistant', 
  content: string | File 
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'chatHome' | 'mainContent'>('chatHome');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = (message: string) => {
    // Add user message
    const newUserMessage: Message = { 
      role: 'user', 
      content: message 
    }
    setMessages([newUserMessage])

    // Navigate to main content
    setCurrentScreen('mainContent')
  }

  return (
    <div className="h-screen bg-black text-white">
      {currentScreen === 'chatHome' ? (
        <ChatHomePage onSubmit={handleSubmit} />
      ) : (
        <MainContent initialMessages={messages} />
      )}
    </div>
  )
}

export default App;