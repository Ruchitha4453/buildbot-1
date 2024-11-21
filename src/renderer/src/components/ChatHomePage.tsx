import React, { useState } from 'react'
import { ChatScreen } from './ChatScreen'

type ChatHomePageProps = {
  onSubmit: (message: string) => void
}

export const ChatHomePage: React.FC<ChatHomePageProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSubmit(message)
      setMessage('')
    }
  }

  return (
    <div className="h-screen bg-gray-900 text-white">
      <ChatScreen 
        message={message} 
        setMessage={setMessage} 
        onSend={handleSend} 
      />
    </div>
  )
}