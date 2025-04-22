
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";

const CodeGen = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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

    if (!apiKey.trim()) {
      toast.error("Please enter your Perplexity API key");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCode = await generateCode(prompt, apiKey);
      setCode(generatedCode);
      toast.success("Code generated successfully!");
    } catch (error) {
      toast.error("Failed to generate code. Please try again.");
      console.error(error);
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
            <div className="space-y-2">
              <Label htmlFor="api-key">Perplexity API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="bg-white/90"
              />
            </div>
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
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
        <Card className="bg-vibesh-dark/95 p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Code Output</h2>
          <pre className="font-mono text-sm overflow-auto max-h-[600px] whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default CodeGen;
