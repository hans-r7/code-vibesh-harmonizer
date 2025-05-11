
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const handlePrompt = () => {
    navigate("/code");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-bold text-vibesh-dark mb-6">
          Code with Vibes.
        </h1>
        <p className="text-xl text-vibesh-dark/80 mb-12 max-w-2xl">
          An AI-native playground for building and dreaming in code.
        </p>
        <Button 
          onClick={handlePrompt} 
          className="bg-vibesh-dark hover:bg-vibesh-dark/90 text-white font-medium px-6 py-2 rounded-full"
        >
          Prompt <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
