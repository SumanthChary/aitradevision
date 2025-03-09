
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const AIConversations: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent AI Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium">No conversations yet</p>
          <p className="text-sm text-muted-foreground mb-4">Start chatting with our AI assistant</p>
          <Link to="/trading-assistant">
            <Button variant="outline" size="sm">
              Chat with AI
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConversations;
