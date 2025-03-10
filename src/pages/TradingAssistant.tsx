
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages } from '@/hooks/useMessages';
import MessageItem from '@/components/trading-assistant/MessageItem';
import LoadingIndicator from '@/components/trading-assistant/LoadingIndicator';
import SuggestedPrompts from '@/components/trading-assistant/SuggestedPrompts';
import MessageInput from '@/components/trading-assistant/MessageInput';

const TradingAssistant: React.FC = () => {
  const { user, loading } = useAuth();
  const { messages, isLoading, sendMessage, messagesEndRef } = useMessages();
  
  // Hooks must be called before conditionals
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <div className="p-4 border-b border-white/5 animate-fade-in">
          <h1 className="text-xl font-bold">AI Trading Assistant</h1>
          <p className="text-sm text-muted-foreground">Chat with our AI assistant for trading insights and pump/dump predictions</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          
          {isLoading && <LoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <SuggestedPrompts onSelectPrompt={sendMessage} />
        )}
        
        <MessageInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default TradingAssistant;
