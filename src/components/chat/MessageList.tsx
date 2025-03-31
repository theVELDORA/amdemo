
import React, { useRef, useEffect } from 'react';
import { Message } from './ChatPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1 pr-4 -mr-4">
      <div className="space-y-4 pb-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex flex-col ${message.isFromUser ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center mb-1">
              <span className="text-xs font-medium text-white/70">{message.sender}</span>
              <span className="text-xs text-white/40 ml-2">
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </span>
            </div>
            
            <div 
              className={`px-3 py-2 rounded-lg max-w-[85%] ${
                message.isFromUser 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white/10 text-white rounded-tl-none'
              }`}
            >
              <p className="text-sm break-words">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
