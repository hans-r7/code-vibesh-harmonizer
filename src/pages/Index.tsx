
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const handlePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/code");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-vibesh-yellow to-vibesh-coral flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-vibesh-dark mb-6">
        Code with Vibes.
      </h1>
      <p className="text-xl text-vibesh-dark/80 mb-12 max-w-2xl">
        An AI-native playground for building, debugging, and dreaming in code.
      </p>
      <form onSubmit={handlePrompt} className="w-full max-w-2xl flex gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
        <Input 
          type="text"
          placeholder="> Build a React navbar with Tailwind..."
          className="flex-1 border-none bg-transparent placeholder:text-vibesh-dark/50"
        />
        <Button className="bg-vibesh-accent hover:bg-vibesh-accent/90 text-vibesh-dark font-medium">
          Generate <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Index;

