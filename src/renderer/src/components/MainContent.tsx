import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Chat } from './Chat';

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

export default function MainContent() {
  const [folderStructure, setFolderStructure] = useState<FileNode[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Fetch folder structure from the server
  useEffect(() => {
    fetch('http://localhost:9000/files')
      .then((response) => response.json())
      .then((data) => setFolderStructure(data))
      .catch((err) => console.error('Error fetching folder structure:', err));
  }, []);

  // Fetch file content when a file is selected
  const handleFileSelect = (filePath: string, content: string) => {
    setActiveFile(filePath);
    setFileContent(content);
  };

  // Function to generate explanation about the active file
  const generateFileExplanation = async () => {
    if (!activeFile) return 'No file is currently selected.';
  
    const lines = fileContent.split('\n').length; // Count number of lines
    const fileType = activeFile.split('.').pop(); // Get file type from path
  
    // Send the file content to an AI API for analysis (assuming OpenAI or another AI service)
    try {
      const response = await fetch('https://api.together.ai/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 1ae8c0c5faa05c67cca43dae81dbf4be7f10845ea4c4b00a0e966751e4e710d3`, // Replace with your Together AI API key
        },
        body: JSON.stringify({
          prompt: `Provide a detailed summary of the following code content:\n${fileContent}`,
          model: 'text-davinci-003', // Replace with the relevant Together AI or OpenAI model
        }),
      });
  
      const aiResponse = await response.json();
  
      if (!response.ok || !aiResponse) {
        throw new Error('Failed to fetch AI explanation');
      }
  
      const aiExplanation = aiResponse.choices[0]?.text?.trim() || 'No detailed explanation available.';
  
      return `The selected file "${activeFile}" is of type "${fileType}" and contains ${lines} lines of code.\n\nAI Explanation:\n${aiExplanation}`;
    } catch (error) {
      console.error('Error fetching AI explanation:', error);
      return `The selected file "${activeFile}" is of type "${fileType}" and contains ${lines} lines of code. Could not fetch a detailed explanation due to an error.`;
    }
  };
  
    

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Component */}
      <div className="w-64 flex-shrink-0 overflow-auto fixed top-0 left-0 h-screen bg-gray-800">
        <Sidebar files={folderStructure} onFileSelect={handleFileSelect} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 fixed top-0 left-64 right-0 z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold">BuildBot.AI</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsChatOpen((prev) => !prev)}
          >
            {isChatOpen ? 'Close Chat' : 'Open Chat'}
          </button>
        </header>

        <main className="flex-1 mt-16 p-4 bg-gray-700 flex">
          <div className={`flex-1 overflow-auto ${isChatOpen ? 'mr-80' : ''}`}>
            {activeFile ? (
              <div>
                <h2 className="text-lg font-bold mb-2">Editing: {activeFile}</h2>
                <pre className="bg-gray-800 p-4 rounded overflow-auto">{fileContent}</pre>
              </div>
            ) : (
              <p>Select a file to view its content</p>
            )}
          </div>
          <Chat 
            activeFile={activeFile} 
            fileContent={fileContent} 
          />
        </main>
      </div>
    </div>
  );
}