
import { ArrowRight } from "lucide-react";

type SuggestedQuestionsProps = {
  questions: string[];
  onSelectQuestion: (question: string) => void;
};

export const SuggestedQuestions = ({ 
  questions, 
  onSelectQuestion 
}: SuggestedQuestionsProps) => {
  return (
    <div className="bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
      <h2 className="text-2xl font-bold text-vibesh-dark mb-4">User History</h2>
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 cursor-pointer 
              transition-all duration-300 
              hover:bg-vibesh-accent/10 
              hover:shadow-md 
              border border-transparent 
              hover:border-vibesh-accent/30 
              group"
            onClick={() => onSelectQuestion(question)}
          >
            <div className="flex items-center justify-between">
              <span className="text-vibesh-dark group-hover:text-vibesh-dark/80 transition-colors">
                {question}
              </span>
              <ArrowRight 
                className="text-vibesh-accent opacity-0 group-hover:opacity-100 transition-opacity" 
                size={18} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
