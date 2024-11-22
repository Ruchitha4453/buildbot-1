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

  // Fetch folder structure from the server
  useEffect(() => {
    fetch('http://192.168.137.113:5000/files')
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
      <div className="w-64 flex-shrink-0 overflow-auto">
        <Sidebar
          files={folderStructure}
          onFileSelect={handleFileSelect}
          className="bg-gray-800"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4">
          <h1 className="text-xl font-bold">BuildBot.AI</h1>
        </header>
        <main className="flex-1 p-4 bg-gray-700 overflow-auto flex">
          <div className="flex-1">
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
            getFileExplanation={generateFileExplanation} 
          />
        </main>
      </div>
    </div>
  );
}