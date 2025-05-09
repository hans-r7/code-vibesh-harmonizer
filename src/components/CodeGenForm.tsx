
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Code } from "lucide-react";

type CodeGenFormProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
};

export const CodeGenForm = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isGenerating 
}: CodeGenFormProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Write your own prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] bg-white/90"
      />
      <Button
        onClick={onGenerate}
        className="bg-vibesh-accent hover:bg-vibesh-accent/90 text-vibesh-dark font-medium"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Code className="mr-2 h-4 w-4" />
            Generate
          </>
        )}
      </Button>
    </div>
  );
};
