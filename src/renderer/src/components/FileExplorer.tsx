// import { FileStructure } from '../App';
// import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid';

// interface FileExplorerProps {
//   files: FileStructure[];
//   onFileSelect: (file: FileStructure) => void;
// }

// export function FileExplorer({ files, onFileSelect }: FileExplorerProps): JSX.Element {
//   const renderTree = (node: FileStructure) => (
//     <div key={node.name} className="ml-4">
//       {node.type === 'folder' ? (
//         <details className="group">
//           <summary className="flex items-center cursor-pointer list-none">
//             <ChevronRightIcon className="w-4 h-4 mr-1 group-open:hidden" />
//             <ChevronDownIcon className="w-4 h-4 mr-1 hidden group-open:block" />
//             <FolderIcon className="w-4 h-4 mr-2 text-yellow-500" />
//             <span>{node.name}</span>
//           </summary>
//           {node.children?.map(renderTree)}
//         </details>
//       ) : (
//         <div 
//           className="flex items-center cursor-pointer hover:bg-gray-700 p-1 rounded"
//           onClick={() => onFileSelect(node)}
//         >
//           <DocumentIcon className="w-4 h-4 mr-2 text-blue-500" />
//           <span>{node.name}</span>
//         </div>
//       )}
//     </div>
//   );

//   return <div className="text-sm">{files.map(renderTree)}</div>;
// }

