import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUp, Sparkles, Zap, Code2, Rocket } from "lucide-react";

const SUGGESTIONS = [
  "Landing page for a coffee shop",
  "Task manager with drag & drop",
  "Portfolio site with a dark theme",
  "Weather dashboard",
];

const Index = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/code", { state: { initialPrompt: prompt } });
  };

  return (
    <main className="flex-1 relative overflow-hidden bg-gradient-hero">
      {/* Decorative grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Powered by AI · Ship in minutes</span>
        </div>

        {/* Hero heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          Build something{" "}
          <span className="text-gradient">Lumicode</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Create apps and websites by chatting with AI. Just describe what you want to build.
        </p>

        {/* Prompt input */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-primary rounded-2xl opacity-40 group-focus-within:opacity-70 blur-md transition-opacity" />
            <div className="relative bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
                placeholder="Ask Lumicode to build a dashboard for tracking..."
                className="w-full bg-transparent px-5 pt-5 pb-16 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[120px]"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-mono">Enter</kbd>
                </span>
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-10 w-10"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPrompt(s)}
                className="px-3 py-1.5 text-xs rounded-full border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-secondary transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24 w-full animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { icon: Zap, title: "Instant", desc: "Generate working code from a single prompt." },
            { icon: Code2, title: "Real code", desc: "Clean, production-ready React & Tailwind." },
            { icon: Rocket, title: "Ship fast", desc: "Preview, iterate, and deploy in minutes." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-2xl bg-card/60 border border-border backdrop-blur-sm text-left hover:border-primary/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Index;
