
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Code, Loader2, Play, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CodePreviewProps = {
  code: string;
  error: string | null;
  isGenerating: boolean;
  prompt: string;
};

export const CodePreview = ({ code, error, isGenerating, prompt }: CodePreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [iframeKey, setIframeKey] = useState(0); // Used to refresh iframe when code changes
  
  // Create sandbox HTML with the generated code
  const createSandboxHtml = () => {
    // Basic HTML structure with imported React and ReactDOM
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f7f7f7;
            }
            #root {
              background-color: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              min-height: 200px;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              ${code}
              
              // Try to find React components in the code
              const possibleComponents = Object.keys(window)
                .filter(key => typeof window[key] === 'function' && /^[A-Z]/.test(key))
                .map(key => window[key]);
              
              // If we found components, try to render the first one
              if (possibleComponents.length > 0) {
                const App = possibleComponents[0];
                ReactDOM.createRoot(document.getElementById('root')).render(<App />);
              } else {
                // If no components were found, try to execute the code as is
                document.getElementById('root').innerHTML = '<div class="code-output">Code executed. See console for output.</div>';
              }
            } catch (error) {
              document.getElementById('root').innerHTML = '<div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: rgba(255,0,0,0.05);">' + 
                '<strong>Error:</strong> ' + error.message + '</div>';
              console.error(error);
            }
          </script>
        </body>
      </html>
    `;
  };
  
  // Function to open sandbox in new tab with less restrictions
  const openInNewTab = () => {
    if (!code) {
      toast.error("Generate some code first before opening in a new tab");
      return;
    }

    // Create a blob from the HTML content
    const htmlContent = createSandboxHtml();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open the blob URL in a new tab/window
    window.open(url, '_blank');
    
    toast.info("Opening code sandbox in a new tab");
  };
  
  // Updated placeholders with web application UI images
  const previewPlaceholders = [
    "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // E-commerce dashboard
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80", // Modern web app UI
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", // E-commerce product page
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"  // Professional dashboard
  ];
  
  // Todo application image URL 
  const todoAppImage = "/lovable-uploads/122e18da-825d-49ba-9d7d-8b2b43a75ca2.png";
  
  // Calculator application image URL
  const calculatorAppImage = "/lovable-uploads/8c51f07f-5d50-4b91-9df6-8d70c2f670a3.png";
  
  // Weather application image URL
  const weatherAppImage = "/lovable-uploads/b5a80a42-9abd-4e4a-949c-74b94f467ab5.png";
  
  // Countdown timer application image URL
  const countdownTimerImage = "/lovable-uploads/e2ce4071-b505-49dd-af9d-093fef64d612.png";

  // Effect to reset iframe when code changes
  useEffect(() => {
    if (code) {
      setIframeKey(prev => prev + 1);
    }
  }, [code]);
  
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

  const handleRunCode = () => {
    if (!code) {
      toast.error("Generate some code first before running it");
      return;
    }
    setActiveTab("preview");
    toast.info("Running code in sandbox environment");
    setIframeKey(prev => prev + 1); // Refresh the iframe
  };

  return (
    <Card className="bg-vibesh-dark/95 p-6 text-white">
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
                onClick={openInNewTab}
              >
                <ExternalLink size={16} className="mr-2" />
                Open in New Tab
              </Button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {code && (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "code" | "preview")} className="mt-2">
          <TabsList className="bg-vibesh-dark/70 border border-white/10">
            <TabsTrigger value="code" className="data-[state=active]:bg-vibesh-accent data-[state=active]:text-vibesh-dark">Code</TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-vibesh-accent data-[state=active]:text-vibesh-dark">Live Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="mt-4">
            <pre className="font-mono text-sm overflow-auto max-h-[500px] whitespace-pre-wrap bg-black/30 p-4 rounded">
              <code>{code}</code>
            </pre>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex flex-col gap-4">
                {/* Image preview */}
                {showPreview && (
                  <div className="mb-2">
                    <h3 className="text-lg font-medium mb-3 text-vibesh-accent">Static Preview</h3>
                    <div className="flex justify-center items-center bg-black/30 rounded-lg overflow-hidden">
                      <img 
                        src={getRandomPlaceholder()} 
                        alt="Web application preview" 
                        className="max-h-[200px] w-full object-cover shadow-lg rounded" 
                      />
                    </div>
                    <p className="text-xs text-white/60 mt-2 text-center">
                      This is a visualization of how your web application might look when rendered
                    </p>
                  </div>
                )}
                
                {/* Live code sandbox */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-vibesh-accent">Live Code Sandbox</h3>
                  <div className="bg-white rounded-lg overflow-hidden border border-white/20 w-full">
                    <iframe 
                      key={iframeKey}
                      srcDoc={createSandboxHtml()}
                      sandbox="allow-scripts"
                      className="w-full bg-white min-h-[300px] rounded"
                      title="Code Preview"
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    This is an attempt to run your code in a sandboxed environment. Complex code may not render properly.
                    For full functionality, use the "Open in New Tab" button.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
    </Card>
  );
};
