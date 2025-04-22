
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const handlePrompt = () => {
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
      <Button 
        onClick={handlePrompt} 
        className="bg-vibesh-accent hover:bg-vibesh-accent/90 text-vibesh-dark font-medium"
      >
        Generate <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Index;
