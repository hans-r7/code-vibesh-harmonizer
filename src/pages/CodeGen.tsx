import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Clock, Loader2 } from "lucide-react";

const CodeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [suggestedQuestions] = useState([
    "How do I implement user authentication in React?",
    "What's the best way to manage global state?",
    "How can I optimize my React components?",
    "What are React hooks and how do I use them?",
    "How do I handle forms in React?",
    "What's the difference between state and props?",
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
      console.log("Generating code for prompt:", prompt);
      
      const generatedCode = await generateCode(prompt);
      console.log("Code generation complete, length:", generatedCode?.length || 0);
      
      if (generatedCode && generatedCode.length > 0) {
        setCode(generatedCode);
        setPromptHistory(prev => [prompt, ...prev.slice(0, 4)]); // Keep last 5 prompts
        toast.success("Code generated successfully!");
      } else {
        setError("No code was generated. Try a different prompt.");
        toast.error("Failed to generate code. Please try again with a different prompt.");
      }
    } catch (error) {
      console.error("Code generation error:", error);
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
          <div className="bg-white/80 rounded-2xl p-6 border border-white/20 shadow-lg">
            {promptHistory.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-vibesh-dark flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5" />
                  Recent Prompts
                </h2>
                <div className="space-y-3">
                  {promptHistory.map((historyPrompt, index) => (
                    <div
                      key={index}
                      className="bg-white/60 rounded-lg p-3 cursor-pointer hover:bg-white/80 transition-colors"
                      onClick={() => setPrompt(historyPrompt)}
                    >
                      <span className="text-vibesh-dark">▶ {historyPrompt}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-4">
                No history yet. Generate your first code!
              </div>
            )}
          </div>

          <div className="bg-white/80 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-vibesh-dark mb-4">User History</h2>
            <div className="space-y-3">
              {suggestedQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-white/60 rounded-lg p-3 cursor-pointer hover:bg-white/80 transition-colors"
                  onClick={() => setPrompt(question)}
                >
                  <span className="text-vibesh-dark">▶ {question}</span>
                </div>
              ))}
            </div>
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
