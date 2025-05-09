
import React from "react";
import { Loader2 } from "lucide-react";

type PreviewLoadingProps = {
  isGenerating: boolean;
};

export const PreviewLoading: React.FC<PreviewLoadingProps> = ({ isGenerating }) => {
  if (!isGenerating) {
    return (
      <div className="text-gray-400 p-8 text-center">
        Enter a prompt and click Generate to create code
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-vibesh-accent" />
      <span className="ml-3">Generating code...</span>
    </div>
  );
};
