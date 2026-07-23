import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateCode } from "@/services/codeGenService";
import { ArrowUp, Loader2, Sparkles, Copy, Check, Code2, Eye, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "Build a React calculator with basic operations",
  "Create a todo list app with local storage",
  "Build a weather app that fetches from an API",
  "Make a login form with validation",
  "Create an image gallery with previews",
  "Build a countdown timer component",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CodeGen = () => {
  const location = useLocation();
  const initialPrompt = (location.state as { initialPrompt?: string })?.initialPrompt ?? "";

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const didRunInitial = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const runGenerate = async (userPrompt: string) => {
    const trimmed = userPrompt.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsGenerating(true);

    try {
      const result = await generateCode(trimmed);
      setCode(result);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I built that for you. Check the preview on the right." },
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I ran into an issue generating code. Try rephrasing." },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (initialPrompt && !didRunInitial.current) {
      didRunInitial.current = true;
      runGenerate(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    runGenerate(prompt);
    setPrompt("");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const buildPreviewHtml = () => {
    if (!code) return "";
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #fff; color: #111; }
      #root { min-height: 100vh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      try {
        ${code}
        const candidates = ['App','default','Component','Main']
          .map(k => window[k])
          .filter(v => typeof v === 'function');
        const Comp = candidates[0] || Object.values(window).filter(v => typeof v === 'function' && /^[A-Z]/.test(v.name || ''))[0];
        if (Comp) {
          ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Comp));
        } else {
          document.getElementById('root').innerHTML = '<div style="padding:24px;color:#666;">Code executed — no React component to render.</div>';
        }
      } catch (err) {
        document.getElementById('root').innerHTML = '<pre style="padding:24px;color:#c00;white-space:pre-wrap;">' + String(err) + '</pre>';
      }
    </script>
  </body>
</html>`;
  };

  return (
    <div className="flex-1 flex flex-col pt-16 h-screen">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] overflow-hidden">
        {/* Chat panel */}
        <aside className="border-r border-border bg-card/40 flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold">Lumicode Chat</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Describe what you'd like to build, or try one of these:
                </p>
                {EXAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="w-full text-left px-3 py-2.5 rounded-lg border border-border bg-secondary/40 hover:bg-secondary hover:border-primary/40 transition-all text-sm text-foreground/90"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "animate-fade-in",
                  msg.role === "user" ? "flex justify-end" : "flex justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.role === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-secondary text-foreground border border-border"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-secondary border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Building...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
                placeholder="Ask Lumicode..."
                rows={2}
                disabled={isGenerating}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/60 disabled:opacity-60"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-gradient-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </aside>

        {/* Preview panel */}
        <section className="flex flex-col overflow-hidden bg-background">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-1 bg-secondary/60 border border-border rounded-lg p-0.5">
              <button
                onClick={() => setPreviewTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  previewTab === "preview"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={() => setPreviewTab("code")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  previewTab === "code"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Code2 className="w-3.5 h-3.5" /> Code
              </button>
            </div>

            {code && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const blob = new Blob([buildPreviewHtml()], { type: "text/html" });
                    window.open(URL.createObjectURL(blob), "_blank");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5" /> Open
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            {!code && !isGenerating && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Nothing to preview yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Send a prompt on the left and Lumicode will generate a working app you can preview here.
                </p>
              </div>
            )}

            {isGenerating && !code && (
              <div className="h-full flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-sm text-muted-foreground">Generating your app...</p>
              </div>
            )}

            {code && previewTab === "preview" && (
              <iframe
                key={code.slice(0, 32)}
                srcDoc={buildPreviewHtml()}
                sandbox="allow-scripts"
                className="w-full h-full bg-white"
                title="Live preview"
              />
            )}

            {code && previewTab === "code" && (
              <pre className="h-full overflow-auto p-6 text-xs font-mono bg-card/40 text-foreground/90 whitespace-pre-wrap">
                <code>{code}</code>
              </pre>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodeGen;
