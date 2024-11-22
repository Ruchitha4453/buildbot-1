import { useEffect, useState } from 'react';

type FileNode = {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};

export default function MainContent() {
  const [folderStructure, setFolderStructure] = useState<FileNode[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  // Fetch folder structure from the server
  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then((response) => response.json())
      .then((data) => setFolderStructure(data))
      .catch((err) => console.error('Error fetching folder structure:', err));
  }, []);

  // Fetch file content when a file is selected
  const handleFileSelect = (filePath: string) => {
    setActiveFile(filePath);
    fetch(`http://localhost:5000/files/${filePath}`)
      .then((response) => response.text())
      .then((content) => setFileContent(content))
      .catch((err) => console.error('Error fetching file content:', err));
  };

  // Recursive rendering of the folder structure
  const renderFolderStructure = (files: FileNode[]) =>
    files.map((file) => (
      <div key={file.name} style={{ marginLeft: '20px' }}>
        {file.type === 'folder' ? (
          <>
            <span style={{ fontWeight: 'bold' }}>{file.name}</span>
            {file.children && renderFolderStructure(file.children)}
          </>
        ) : (
          <span
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => handleFileSelect(file.name)}
          >
            {file.name}
          </span>
        )}
      </div>
    ));

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 flex-shrink-0 overflow-auto bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-2">Folder Structure</h2>
        {renderFolderStructure(folderStructure)}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4">
          <h1 className="text-xl font-bold">BuildBot.AI</h1>
        </header>
        <main className="flex-1 p-4 bg-gray-700 overflow-auto">
          {activeFile ? (
            <div>
              <h2 className="text-lg font-bold mb-2">Editing: {activeFile}</h2>
              <pre>{fileContent}</pre>
            </div>
          ) : (
            <p>Select a file to view its content.</p>
          )}
        </main>
      </div>
    </div>
  );
}
