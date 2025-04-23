
import { Link } from "react-router-dom";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const isScrolled = useScrollDirection();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
        isScrolled ? "bg-transparent" : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-vibesh-dark">
          <img 
            src="/lovable-uploads/5624ad14-ffdf-4b31-8079-102e418d9259.png" 
            alt="VibeCoder Logo" 
            className="h-8 w-8"
          />
          <span>VibeCoder</span>
        </Link>
        <div className={cn(
          "space-x-6 transition-all duration-300",
          isScrolled ? "opacity-0 invisible" : "opacity-100 visible"
        )}>
          <Link to="/about" className="text-vibesh-dark hover:opacity-80">
            About
          </Link>
          <Link to="/login" className="text-vibesh-dark hover:opacity-80">
            Login
          </Link>
          <Link to="/signup" className="text-vibesh-dark hover:opacity-80">
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};
