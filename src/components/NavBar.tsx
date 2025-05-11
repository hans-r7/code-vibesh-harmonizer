
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
        <Link to="/" className="text-xl font-bold text-lumicode-dark">
          Lumicode
        </Link>
        <div className="space-x-6">
          <Link to="/about" className="text-lumicode-dark hover:opacity-80">
            About
          </Link>
          <Link to="/login" className="text-lumicode-dark hover:opacity-80">
            Login
          </Link>
          <Link to="/signup" className="text-lumicode-dark hover:opacity-80">
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};
