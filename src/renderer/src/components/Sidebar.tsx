import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

type SidebarProps = {
  files: FileNode[];
  onFileSelect: (filePath: string, fileContent: string) => void; // Update signature to include file content
  className?: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ files, onFileSelect, className }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderTree = (node: FileNode, path: string = '') => {
    const currentPath = `${path}${path ? '/' : ''}${node.name}`;
    const isExpanded = expandedFolders.has(currentPath);

    return (
      <div key={currentPath} className="ml-4">
        {node.type === 'folder' ? (
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-gray-700 p-1 rounded"
              onClick={() => toggleFolder(currentPath)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <Folder className="w-4 h-4 mr-1" />
              <span>{node.name}</span>
            </div>
            {isExpanded && node.children && (
              <div className="ml-4">
                {node.children.map((child) => renderTree(child, currentPath))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer hover:bg-gray-700 p-1 rounded"
            onClick={() => {
              // Fetch actual file content from the server
              fetch(`http://192.168.137.113:5000/${currentPath}`)
                .then((response) => response.text()) // Assuming the response is plain text
                .then((content) => {
                  onFileSelect(currentPath, content); // Pass both path and content
                })
                .catch((err) => console.error('Error fetching file content:', err));
            }}
          >
            <File className="w-4 h-4 mr-1" />
            <span>{node.name}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-gray-800 p-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Project Files</h2>
      {files.map((file) => renderTree(file))}
    </div>
  );
};