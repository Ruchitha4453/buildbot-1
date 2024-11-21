import { useState } from 'react'
import { Editor } from './Editor'
import { Chat } from './Chat'
import { dummyFiles, dummyFileContents } from '../dummyData'
import { Sidebar } from './Sidebar'

export default function BuildBotAI() {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [fileContents, setFileContents] = useState(dummyFileContents)
  const [showSidebar, setShowSidebar] = useState(true)

  const handleFileSelect = (filePath: string) => {
    setActiveFile(filePath)
  }

  const handleCodeChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      setFileContents(prev => ({
        ...prev,
        [activeFile]: value
      }))
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && (
        <Sidebar files={dummyFiles} onFileSelect={handleFileSelect} className="w-64 flex-shrink-0 overflow-auto" />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">BuildBot.AI</h1>
          <button onClick={() => setShowSidebar(!showSidebar)} className="px-3 py-1 bg-blue-500 rounded">
            {showSidebar ? 'Hide' : 'Show'} Sidebar
          </button>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <Editor
            file={activeFile}
            content={activeFile ? fileContents[activeFile] : ''}
            onChange={handleCodeChange}
            className="flex-1 overflow-hidden"
          />
          <Chat className="w-1/3 flex-shrink-0 overflow-auto" />
        </div>
      </div>
    </div>
  )
}

