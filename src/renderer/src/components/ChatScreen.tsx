import { SendHorizonalIcon } from 'lucide-react'
import React, { useState } from 'react'

interface ChatScreenProps {
  message: string
  setMessage: (message: string) => void
  onSend: () => void
}

export function ChatScreen({ message, setMessage, onSend }: ChatScreenProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend()
  }

  const [activeButtons, setActiveButtons] = useState<string[]>([])

  const handleClick = (buttonName: string) => {
    setActiveButtons(
      (prev) =>
        prev.includes(buttonName)
          ? prev.filter((name) => name !== buttonName) // Remove if already active
          : [...prev, buttonName] // Add if not active
    )
  }

  return (
    <div className="p-8 flex flex-col">
      <header className="flex flex-col justify-around items-center  mt-14">
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-7xl font-bold my-8 text-blue-500">BuildBot.ai</h1>
          <p className="text-lg px-16 text-center text-gray-500">
            BuildBot.ai is a revolutionary coding assistant designed to operate as an intelligent
            agent on your local machine, transforming app development by automating up to 95% of the
            process. It builds entire applications from scratch, including components, pages, and
            APIs, while being highly adaptable to various tech stacks like React.js. With
            privacy-focused features, it offers both local and deployed versions, ensuring full code
            security and customization. Its app context awareness streamlines feature additions, and
            it provides clear, transparent explanations for every coding step.
          </p>
        </div>
        <h1 className="text-3xl font-bold mt-8">What can I help with?</h1>
      </header>
      <div className="flex m-8"></div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center  px-20">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message BuildBot.ai"
            className="flex-1 p-4 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-4 p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <SendHorizonalIcon />
          </button>
        </div>
      </form>
      <div className="flex space-x-4 justify-center mx-auto">
        <button
          className={`p-4 rounded-full transition-colors duration-200 ${
            activeButtons.includes('login') ? 'bg-blue-700' : 'bg-gray-700'
          }`}
          onClick={() => handleClick('login')}
        >
          Login Page
        </button>
        <button
          className={`p-4 rounded-full transition-colors duration-200 ${
            activeButtons.includes('hero') ? 'bg-blue-700' : 'bg-gray-700'
          }`}
          onClick={() => handleClick('hero')}
        >
          Hero Section
        </button>
        <button
          className={`p-4 rounded-full transition-colors duration-200 ${
            activeButtons.includes('todo') ? 'bg-blue-700' : 'bg-gray-700'
          }`}
          onClick={() => handleClick('todo')}
        >
          Todo Application
        </button>
      </div>
    </div>
  )
}
