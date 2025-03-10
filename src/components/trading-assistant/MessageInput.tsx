
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  defaultValue?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isLoading,
  defaultValue = ''
}) => {
  const [input, setInput] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="p-4 border-t border-white/5">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          className="flex-1"
          placeholder="Ask me about trading, markets, pumps/dumps, or strategies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()} className="hover-scale">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
