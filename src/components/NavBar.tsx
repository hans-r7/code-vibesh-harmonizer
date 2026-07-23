import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all">
            <Sparkles className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Lumicode
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/code", label: "Build" },
            { to: "/about", label: "About" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive(link.to)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
