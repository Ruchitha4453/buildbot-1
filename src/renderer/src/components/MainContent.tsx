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
  const generateFileExplanation = () => {
    if (!activeFile) return '';

    const lines = fileContent.split('\n').length; // Count number of lines
    const fileType = activeFile.split('.').pop(); // Get file type from path

    return `The selected file "${activeFile}" is of type "${fileType}". It contains ${lines} lines of code.`;
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

          {/* Chat Component */}
          {isChatOpen && (
            <div className="w-80 flex-shrink-0 bg-gray-800 fixed top-16 bottom-0 right-0 p-4 overflow-auto">
              <Chat
                activeFile={activeFile}
                getFileExplanation={generateFileExplanation}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}