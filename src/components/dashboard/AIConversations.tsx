
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bot, Sparkles } from 'lucide-react';

// Sample conversation data (would come from a database in a real app)
const recentConversations = [
  {
    id: '1',
    topic: 'Market Analysis',
    preview: 'Analysis of current market trends and potential opportunities',
    date: '2 hours ago',
  },
  {
    id: '2',
    topic: 'Trading Strategy',
    preview: 'Discussion about risk management and position sizing',
    date: 'Yesterday',
  },
];

const AIConversations: React.FC = () => {
  const hasConversations = recentConversations.length > 0;
  
  return (
    <Card className="hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          Recent AI Conversations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasConversations ? (
          <div className="space-y-4">
            {recentConversations.map((conversation) => (
              <Link 
                key={conversation.id} 
                to="/trading-assistant" 
                className="block p-3 rounded-md hover:bg-secondary/10 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{conversation.topic}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {conversation.preview}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conversation.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            <Link to="/trading-assistant">
              <Button variant="outline" size="sm" className="w-full mt-2 hover-scale">
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Conversations
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-8 animate-fade-in">
            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No conversations yet</p>
            <p className="text-sm text-muted-foreground mb-4">Get predictions on pumps, dumps, or holds</p>
            <Link to="/trading-assistant">
              <Button variant="outline" size="sm" className="hover-scale">
                <Sparkles className="h-4 w-4 mr-2 text-primary animate-pulse" />
                Chat with AI
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIConversations;
