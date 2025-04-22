
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const CodeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [examples] = useState([
    "Build a dark-themed dashboard with Tailwind",
    "Explain this TypeScript error",
    "Create a login form with validation",
    "Build a collapsible sidebar in React",
    "Refactor this function to be more readable",
    "Generate SEO metadata for a blog post",
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setCode(""); // Clear previous code
    
    try {
      toast.info("Connecting to code generation API...");
      const generatedCode = await generateCode(prompt);
      
      if (generatedCode) {
        setCode(generatedCode);
        toast.success("Code generated successfully!");
      } else {
        setError("No code was generated. Try a different prompt.");
        toast.error("Failed to generate code. Please try again with a different prompt.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to generate code. Please try again.");
      toast.error("Failed to generate code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-vibesh-yellow to-vibesh-coral p-6">
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-vibesh-dark">Prompt Examples</h2>
          <div className="space-y-3">
            {examples.map((example, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:bg-white/80 transition-colors"
                onClick={() => setPrompt(example)}
              >
                <span>▶ {example}</span>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your own prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] bg-white/90"
            />
            <Button
              onClick={handleGenerate}
              className="bg-vibesh-accent hover:bg-vibesh-accent/90 text-vibesh-dark font-medium"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
        <Card className="bg-vibesh-dark/95 p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Code Output</h2>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isGenerating && !code && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-vibesh-accent" />
              <span className="ml-3">Generating code...</span>
            </div>
          )}
          {!isGenerating && !code && !error && (
            <div className="text-gray-400 p-8 text-center">
              Enter a prompt and click Generate to create code
            </div>
          )}
          {code && (
            <pre className="font-mono text-sm overflow-auto max-h-[600px] whitespace-pre-wrap bg-black/30 p-4 rounded">
              <code>{code}</code>
            </pre>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CodeGen;
