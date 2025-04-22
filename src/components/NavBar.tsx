
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-vibesh-dark">
          VibeCoder
        </Link>
        <div className="space-x-6">
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
