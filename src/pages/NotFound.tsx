import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-hero relative px-6">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative text-center">
        <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">This page took a wrong turn.</p>
        <Link to="/">
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant">
            <Home className="w-4 h-4 mr-2" /> Back home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
