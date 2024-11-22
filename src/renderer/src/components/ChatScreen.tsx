import { ListFilter, LogInIcon, PlusCircleIcon, SendHorizonalIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

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
  const [file, setFile] = useState<File | null>(null)
  const [showPopup, setShowPopup] = useState(false) // State to manage popup visibility
  const popupRef = useRef<HTMLDivElement>(null) // Ref for the popup

  const handleClick = (buttonName: string) => {
    setActiveButtons(
      (prev) =>
        prev.includes(buttonName)
          ? prev.filter((name) => name !== buttonName) // Remove if already active
          : [...prev, buttonName] // Add if not active
    )
  }

  const togglePopup = () => {
    setShowPopup((prev) => !prev)
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <header className="flex flex-col justify-between items-center mt-14">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl font-bold my-8 text-blue-500">BuildBot.ai</h1>
          <p className="text-[15px] px-4 sm:px-16 text-center text-gray-500">
            BuildBot.ai is a revolutionary coding assistant designed to operate as an intelligent
            agent on your local machine, transforming app development by automating up to 95% of the
            process. It builds entire applications from scratch, including components, pages, and
            APIs, while being highly adaptable to various tech stacks like React.js. With
            privacy-focused features, it offers both local and deployed versions, ensuring full code
            security and customization. Its app context awareness streamlines feature additions, and
            it provides clear, transparent explanations for every coding step.
          </p>
        </div>
        
      </header>

      <form onSubmit={handleSubmit} className="mb-4 mt-5 px-8">
      <h1 className="text-3xl font-bold mt-12 text-center">What can I help with?</h1>
        <div className="flex flex-col bg-gray-700 h-[15vh] rounded-xl border-2 border-gray-500 px-5 mt-8">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message BuildBot.ai"
            className="flex-1 p-4 focus:outline-none  bg-gray-700 rounded-xl "
          />
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer" onClick={togglePopup}>
                <ListFilter size={22} className="text-gray-400 " />
                <span className="text-sm text-gray-400 font-semibold">Focus</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <PlusCircleIcon size={22} className="text-gray-400 " />
                <span className="text-sm text-gray-400 font-semibold">Attach</span>

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              className="ml-4 p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors duration-200"
            >
              <SendHorizonalIcon size={22} />
            </button>
          </div>
        </div>
      </form>

      {/* Popup for Focus Options */}
      {showPopup && (
        <div
          ref={popupRef}
          className="bg-neutral-950 shadow-lg rounded-lg p-4 mt-2 z-10 max-w-md w-full "
        >
          <h2 className="font-bold text-lg text-gray-400">Choose an App:</h2>
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
          >
            &times; {/* Close icon */}
          </button>
          <ul className="flex flex-col">
            <li className="flex items-center gap-2 cursor-pointer p-2">
              {/* You can replace this icon with actual icons for each app */}
              <div className="flex space-x-2 justify-center mx-auto">
                <button
                  className={`flex items-center p-4 text-sm rounded-xl transition-colors duration-200 hover:bg-blue-700 ${
                    activeButtons.includes('login') ? 'bg-blue-700' : 'bg-gray-700'
                  }`}
                  onClick={() => handleClick('login')}
                >
                  Login Page
                </button>
                <button
                  className={`p-4 rounded-xl transition-colors duration-200 hover:bg-blue-700 ${
                    activeButtons.includes('hero') ? 'bg-blue-700' : 'bg-gray-700'
                  }`}
                  onClick={() => handleClick('hero')}
                >
                  Hero Section
                </button>
                <button
                  className={`p-4 rounded-xl transition-colors duration-200 hover:bg-blue-700 ${
                    activeButtons.includes('todo') ? 'bg-blue-700' : 'bg-gray-700'
                  }`}
                  onClick={() => handleClick('todo')}
                >
                  Todo Application
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="flex space-x-4 justify-center mx-auto">
        {/* Additional buttons can be added here if needed */}
      </div>
    </div>
  )
}
