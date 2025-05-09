
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Code, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { openSandboxInNewTab } from "@/utils/SandboxUtils";

type PreviewHeaderProps = {
  code: string;
  showPreview: boolean;
  onTogglePreview: () => void;
  onRunCode: () => void;
};

export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  code,
  showPreview,
  onTogglePreview,
  onRunCode
}) => {
  const handleTogglePreview = () => {
    if (!code) {
      toast.error("Generate some code first before viewing preview");
      return;
    }
    
    onTogglePreview();
    if (!showPreview) {
      toast.info("Showing preview of how the code might look when rendered");
    }
  };
  
  const handleRunCode = () => {
    if (!code) {
      toast.error("Generate some code first before running it");
      return;
    }
    
    onRunCode();
    toast.info("Running code in sandbox environment");
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Code Output</h2>
      <div className="flex gap-2">
        {code && (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="border-vibesh-accent text-vibesh-accent hover:bg-vibesh-accent/20"
              onClick={handleTogglePreview}
            >
              <Play size={16} className="mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-vibesh-accent hover:bg-vibesh-accent/90 text-vibesh-dark font-medium"
              onClick={handleRunCode}
            >
              <Code size={16} className="mr-2" />
              Run Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-vibesh-accent text-vibesh-accent hover:bg-vibesh-accent/20"
              onClick={() => openSandboxInNewTab(code)}
            >
              <ExternalLink size={16} className="mr-2" />
              Open in New Tab
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
