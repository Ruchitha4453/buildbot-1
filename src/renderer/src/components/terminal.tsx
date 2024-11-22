
import React, { useState, useRef, useEffect } from 'react'

type TerminalProps = {
  className?: string
}

export const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [output, setOutput] = useState<string[]>(['Welcome to BuildBot.AI Terminal'])
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className={`bg-gray-800 p-4 flex flex-col ${className}`}>
      <h2 className="text-lg font-semibold mb-2">Terminal</h2>
      <div ref={outputRef} className="flex-1 bg-black p-2 rounded overflow-auto">
        {output.map((line, index) => (
          <div key={index} className="text-green-400 font-mono">{line}</div>
        ))}
      </div>
    </div>
  )
}






