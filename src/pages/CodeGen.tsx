
import { useState } from "react";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";
import { CodeGenForm } from "@/components/CodeGenForm";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { CodePreview } from "@/components/CodePreview";

const CodeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [suggestedQuestions] = useState([
    "Generate a React calculator app with basic operations",
    "Create a todo list app with local storage",
    "Build a weather app that fetches data from an API",
    "Make a simple authentication form with validation",
    "Create a React image gallery with previews",
    "Build a countdown timer component"
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

  const handleSelectQuestion = (question: string) => {
    setPrompt(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-vibesh-yellow to-vibesh-coral p-6">
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SuggestedQuestions 
            questions={suggestedQuestions} 
            onSelectQuestion={handleSelectQuestion} 
          />
          <CodeGenForm 
            prompt={prompt} 
            setPrompt={setPrompt} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating} 
          />
        </div>

        <CodePreview 
          code={code}
          error={error}
          isGenerating={isGenerating}
          prompt={prompt}
        />
      </div>
    </div>
  );
};

export default CodeGen;
