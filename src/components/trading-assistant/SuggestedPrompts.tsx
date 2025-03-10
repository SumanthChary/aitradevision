
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '@/constants/tradingPrompts';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="px-4 py-3 animate-fade-in">
      <p className="text-sm font-medium mb-3 text-muted-foreground">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            onClick={() => onSelectPrompt(prompt)}
            className="hover-scale flex items-center"
          >
            <Sparkles className="h-3 w-3 mr-2 text-primary" />
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
