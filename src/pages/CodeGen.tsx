import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, ArrowRight, Play } from "lucide-react";

const CodeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [suggestedQuestions] = useState([
    "Generate a React calculator app with basic operations",
    "Create a todo list app with local storage",
    "Build a weather app that fetches data from an API",
    "Make a simple authentication form with validation",
    "Create a React image gallery with previews",
    "Build a countdown timer component"
  ]);
  
  // Updated placeholders with web application UI images
  const previewPlaceholders = [
    "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // E-commerce dashboard
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80", // Modern web app UI
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", // E-commerce product page
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"  // Professional dashboard
  ];
  
  // Todo application image URL - updated with the new image
  const todoAppImage = "/lovable-uploads/122e18da-825d-49ba-9d7d-8b2b43a75ca2.png";
  
  // Calculator application image URL
  const calculatorAppImage = "/lovable-uploads/8c51f07f-5d50-4b91-9df6-8d70c2f670a3.png";
  
  // Weather application image URL
  const weatherAppImage = "/lovable-uploads/b5a80a42-9abd-4e4a-949c-74b94f467ab5.png";
  
  // Countdown timer application image URL - newly added
  const countdownTimerImage = "/lovable-uploads/e2ce4071-b505-49dd-af9d-093fef64d612.png";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setCode(""); // Clear previous code
    setShowPreview(false); // Hide preview when generating new code
    
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
  
  const handleTogglePreview = () => {
    if (!code) {
      toast.error("Generate some code first before viewing preview");
      return;
    }
    setShowPreview(!showPreview);
    if (!showPreview) {
      toast.info("Showing preview of how the code might look when rendered");
    }
  };
  
  const getRandomPlaceholder = () => {
    const lowercasePrompt = prompt.toLowerCase();
    
    // If the prompt contains "countdown timer" or similar, return the countdown timer image
    if (lowercasePrompt.includes("countdown timer") || 
        lowercasePrompt.includes("countdown app") || 
        lowercasePrompt.includes("timer component") ||
        lowercasePrompt.includes("timer app") ||
        lowercasePrompt.includes("countdown")) {
      return countdownTimerImage;
    }
    
    // If the prompt contains "weather application" or similar, return the weather app image
    if (lowercasePrompt.includes("weather application") || 
        lowercasePrompt.includes("weather app") || 
        lowercasePrompt.includes("weather forecast") ||
        lowercasePrompt.includes("weather")) {
      return weatherAppImage;
    }
    
    // If the prompt contains "calculator application" or similar, return the calculator app image
    if (lowercasePrompt.includes("calculator application") || 
        lowercasePrompt.includes("calculator app") || 
        lowercasePrompt.includes("calculator")) {
      return calculatorAppImage;
    }
    
    // If the prompt contains "todo application" or similar, return the todo app image
    if (lowercasePrompt.includes("todo application") || 
        lowercasePrompt.includes("todo list") || 
        lowercasePrompt.includes("todo app")) {
      return todoAppImage;
    }
    
    // Otherwise return a random image from the placeholders
    const randomIndex = Math.floor(Math.random() * previewPlaceholders.length);
    return previewPlaceholders[randomIndex];
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-vibesh-dark mb-4">User History</h2>
            <div className="space-y-3">
              {suggestedQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 cursor-pointer 
                    transition-all duration-300 
                    hover:bg-vibesh-accent/10 
                    hover:shadow-md 
                    border border-transparent 
                    hover:border-vibesh-accent/30 
                    group"
                  onClick={() => setPrompt(question)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-vibesh-dark group-hover:text-vibesh-dark/80 transition-colors">
                      {question}
                    </span>
                    <ArrowRight 
                      className="text-vibesh-accent opacity-0 group-hover:opacity-100 transition-opacity" 
                      size={18} 
                    />
                  </div>
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
              className="bg-vibesh-dark hover:bg-vibesh-dark/90 text-white font-medium"
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Code Output</h2>
            {code && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-vibesh-accent text-vibesh-accent hover:bg-vibesh-accent/20"
                onClick={handleTogglePreview}
              >
                <Play size={16} className="mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            )}
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {showPreview && (
            <div className="mb-6 bg-white/10 rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium mb-3 text-vibesh-accent">Visual Preview</h3>
              <div className="flex justify-center items-center bg-black/30 rounded-lg overflow-hidden">
                <img 
                  src={getRandomPlaceholder()} 
                  alt="Web application preview" 
                  className="max-h-[300px] w-full object-cover shadow-lg rounded" 
                />
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">
                This is a visualization of how your web application might look when rendered
              </p>
            </div>
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
