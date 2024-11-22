import React from 'react';
import MonacoEditor from '@monaco-editor/react';

type EditorProps = {
  file: string | null;
  content: string;
  onChange: (value: string | undefined) => void;
  className?: string;
};

export const Editor: React.FC<EditorProps> = ({ file, content, onChange, className }) => {
  const getLanguage = (fileName: string) => {
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return 'typescript';
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return 'javascript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    return 'plaintext';
  };

  return (
    <div className={`bg-gray-700 ${className}`}>
      <h2 className="text-lg font-semibold p-4">Editor</h2>
      {file ? (
        <MonacoEditor
          height="90%"
          language={getLanguage(file)}
          theme="vs-dark"
          value={content}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      ) : (
        <div className="p-4">Select a file to edit or generate code</div>
      )}
    </div>
  );
};