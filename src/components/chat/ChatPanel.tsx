
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Mock initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'System',
        content: 'Welcome to the meeting chat! 👋',
        timestamp: new Date(Date.now() - 3600000),
        isFromUser: false,
      },
      {
        id: '2',
        sender: 'Alex Johnson',
        content: 'Hi everyone! Excited for today\'s meeting.',
        timestamp: new Date(Date.now() - 1800000),
        isFromUser: false,
      },
      {
        id: '3',
        sender: 'You',
        content: 'Good to see everyone. Let\'s get started.',
        timestamp: new Date(Date.now() - 900000),
        isFromUser: true,
      },
    ];
    
    setMessages(initialMessages);
  }, []);
  
  // Animation for panel entry/exit
  useEffect(() => {
    if (panelRef.current) {
      if (isOpen) {
        panelRef.current.classList.remove('translate-x-full');
      } else {
        panelRef.current.classList.add('translate-x-full');
      }
    }
  }, [isOpen]);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content,
      timestamp: new Date(),
      isFromUser: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Mock response after delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Alex Johnson',
        content: getRandomResponse(),
        timestamp: new Date(),
        isFromUser: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };
  
  const getRandomResponse = () => {
    const responses = [
      "That's a great point! 🙌",
      "I agree with what you're saying. 👍",
      "Could you elaborate more on that? 🤔",
      "Let's discuss that after the presentation. 📝",
      "Thanks for sharing that info. 💯",
      "I'll look into that and get back to you. 👀",
      "That's exactly what I was thinking. 💭",
      "Great idea! 💡",
      "Nice! 😊",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  return (
    <div 
      ref={panelRef}
      className={`fixed inset-y-0 right-0 w-80 max-w-full z-30 glass-dark border-l border-white/10 transition-transform duration-300 transform ${
        isOpen ? '' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-white text-lg">Chat</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
