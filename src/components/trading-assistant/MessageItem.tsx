
import React from 'react';
import { Message } from '@/types/trading';
import { BarChart3, User } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-3 ${
        message.isUser ? 'justify-end' : 'justify-start'
      } animate-fade-in`}
    >
      {!message.isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BarChart3 className="h-4 w-4 text-primary" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card'
        } hover-scale`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
      
      {message.isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
