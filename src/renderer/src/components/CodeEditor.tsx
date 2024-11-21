import { FileStructure } from '../App';

interface CodeEditorProps {
  file: FileStructure | null;
}

export function CodeEditor({ file }: CodeEditorProps): JSX.Element {
  if (!file || file.type === 'folder') {
    return <div className="text-gray-500">Select a file to view its contents</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{file.name}</h2>
      <pre className="bg-gray-800 p-4 rounded overflow-auto">
        <code>{file.content}</code>
      </pre>
    </div>
  );
}

