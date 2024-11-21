import React, { useState } from 'react'
import { Send, Upload } from 'lucide-react'
import { Message } from './MainContent'

type ChatProps = {
  className?: string
  messages: Message[]
  onNewMessage: (message: string) => void
}

export const Chat: React.FC<ChatProps> = ({ 
  className, 
  messages, 
  onNewMessage 
}) => {
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSend = () => {
    if (input.trim()) {
      onNewMessage(input)
      setInput('')
    } else if (file) {
      onNewMessage(file.name)
      setFile(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className={`h-full flex flex-col bg-gray-800 p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Chat</h2>
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
              }`}
            >
              {typeof message.content === 'string' ? message.content : 'Uploaded file'}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Upload size={20} className="text-gray-400" />
          <span className="text-gray-400">Upload file</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 rounded">
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}