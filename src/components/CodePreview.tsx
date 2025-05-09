
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CodeEditor } from "@/components/code-preview/CodeEditor";
import { LivePreview } from "@/components/code-preview/LivePreview";
import { PreviewHeader } from "@/components/code-preview/PreviewHeader";
import { PreviewLoading } from "@/components/code-preview/PreviewLoading";

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
  
  // Effect to reset iframe when code changes
  useEffect(() => {
    if (code) {
      setIframeKey(prev => prev + 1);
    }
  }, [code]);
  
  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleRunCode = () => {
    setActiveTab("preview");
    setIframeKey(prev => prev + 1); // Refresh the iframe
  };

  return (
    <Card className="bg-vibesh-dark/95 p-6 text-white">
      <PreviewHeader 
        code={code} 
        showPreview={showPreview} 
        onTogglePreview={handleTogglePreview}
        onRunCode={handleRunCode}
      />
      
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
            <CodeEditor code={code} />
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <LivePreview 
              code={code} 
              prompt={prompt} 
              iframeKey={iframeKey} 
              showPreview={showPreview} 
            />
          </TabsContent>
        </Tabs>
      )}
      
      {(!isGenerating && !code && !error) && (
        <PreviewLoading isGenerating={false} />
      )}
      
      {(isGenerating && !code) && (
        <PreviewLoading isGenerating={true} />
      )}
    </Card>
  );
};
