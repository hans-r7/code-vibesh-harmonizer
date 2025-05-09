
import React from "react";

type CodeEditorProps = {
  code: string;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
  return (
    <pre className="font-mono text-sm overflow-auto max-h-[500px] whitespace-pre-wrap bg-black/30 p-4 rounded">
      <code>{code}</code>
    </pre>
  );
};
