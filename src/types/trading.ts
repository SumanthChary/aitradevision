
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  conversationId?: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}
