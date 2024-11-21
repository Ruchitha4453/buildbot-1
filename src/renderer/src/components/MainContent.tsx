import { useState, useEffect } from 'react'
import { Editor } from './Editor'
import { Chat } from './Chat'
import { Sidebar } from './Sidebar'

export type Message = { 
  role: 'user' | 'assistant', 
  content: string | File 
}

type MainContentProps = {
  initialMessages?: Message[]
}

export default function MainContent({ initialMessages = [] }: MainContentProps) {
  const { dummyFiles, dummyFileContents } = generateDummyData();

  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [fileContents, setFileContents] = useState(dummyFileContents)
  const [showSidebar, setShowSidebar] = useState(true)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

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

  const handleNewMessage = (message: string) => {
    // Add user message
    const newUserMessage: Message = { 
      role: 'user', 
      content: message 
    }
    setMessages(prev => [...prev, newUserMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'This is a simulated response from BuildBot.AI.'
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && (
        <Sidebar 
          files={dummyFiles} 
          onFileSelect={handleFileSelect} 
          className="w-64 flex-shrink-0 overflow-auto" 
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">BuildBot.AI</h1>
          <button 
            onClick={() => setShowSidebar(!showSidebar)} 
            className="px-3 py-1 bg-blue-500 rounded"
          >
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
          <Chat 
            className="w-1/3 flex-shrink-0 overflow-auto"
            messages={messages}
            onNewMessage={handleNewMessage}
          />
        </div>
      </div>
    </div>
  )
}

type FileNode = {
  name: string;
  types: "file" | "folder";
  children?: FileNode[];
};


// Generator function to simulate the creation of dummy files and their contents
function generateDummyData() {
  const dummyFiles:FileNode[] = [
    {
      name: 'pages',
      types: 'folder',
      children: [
        { name: 'index.tsx', types: 'file' },
        { name: 'about.tsx', types: 'file' },
        { name: 'api', types: 'folder', children: [{ name: 'hello.ts', types: 'file' }] }
      ]
    },
    {
      name: 'components',
      types: 'folder',
      children: [
        { name: 'Header.tsx', types: 'file' },
        { name: 'Footer.tsx', types: 'file' }
      ]
    },
    { name: 'styles', types: 'folder', children: [{ name: 'globals.css', types: 'file' }] },
    { name: 'package.json', types: 'file' },
    { name: 'tsconfig.json', types: 'file' }
  ]

  const dummyFileContents = {
    'pages/index.tsx': `
          import Head from 'next/head'

          export default function Home() {
              return (
                  <div>
                      <Head>
                          <title>BuildBot.AI</title>
                          <meta name="description" content="AI-powered development tool" />
                          <link rel="icon" href="/favicon.ico" />
                      </Head>

                      <main>
                          <h1>Welcome to BuildBot.AI</h1>
                      </main>
                  </div>
              )
          }`,
    'pages/about.tsx': `
          export default function About() {
              return (
                  <div>
                      <h1>About BuildBot.AI</h1>
                      <p>BuildBot.AI is an AI-powered development tool.</p>
                  </div>
              )
          }`,
    'pages/api/hello.ts': `
          import types { NextApiRequest, NextApiResponse } from 'next'

          types Data = {
              name: string
          }

          export default function handler(
              req: NextApiRequest, 
              res: NextApiResponse<Data>
          ) {
              res.status(200).json({ name: 'BuildBot.AI' })
          }`,
    'components/Header.tsx': `
          export default function Header() {
              return (
                  <header>
                      <nav>
                          <ul>
                              <li><a href="/">Home</a></li>
                              <li><a href="/about">About</a></li>
                          </ul>
                      </nav>
                  </header>
              )
          }`,
    'components/Footer.tsx': `
          export default function Footer() {
              return (
                  <footer>
                      <p>&copy; 2023 BuildBot.AI</p>
                  </footer>
              )
          }`,
    'styles/globals.css': `
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }`
  }

  return { dummyFiles, dummyFileContents }
}

// Use the function to get the data

