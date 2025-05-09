
import React, { useState } from "react";
import { createSandboxHtml, getPlaceholderImage } from "@/utils/SandboxUtils";

type LivePreviewProps = {
  code: string;
  prompt: string;
  iframeKey: number;
  showPreview: boolean;
};

export const LivePreview: React.FC<LivePreviewProps> = ({ 
  code, 
  prompt, 
  iframeKey, 
  showPreview 
}) => {
  // Image collections
  const previewPlaceholders = [
    "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80", // E-commerce dashboard
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80", // Modern web app UI
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", // E-commerce product page
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"  // Professional dashboard
  ];
  
  const specialImages = {
    todo: "/lovable-uploads/122e18da-825d-49ba-9d7d-8b2b43a75ca2.png",
    calculator: "/lovable-uploads/8c51f07f-5d50-4b91-9df6-8d70c2f670a3.png",
    weather: "/lovable-uploads/b5a80a42-9abd-4e4a-949c-74b94f467ab5.png",
    countdownTimer: "/lovable-uploads/e2ce4071-b505-49dd-af9d-093fef64d612.png"
  };

  return (
    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
      <div className="flex flex-col gap-4">
        {/* Image preview */}
        {showPreview && (
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-3 text-vibesh-accent">Static Preview</h3>
            <div className="flex justify-center items-center bg-black/30 rounded-lg overflow-hidden">
              <img 
                src={getPlaceholderImage(prompt, previewPlaceholders, specialImages)} 
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
              srcDoc={createSandboxHtml(code)}
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
  );
};
