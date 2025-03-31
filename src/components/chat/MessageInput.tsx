
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleAttachment = () => {
    // Mock file attachment functionality
    console.log('Attachment button clicked');
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };
  
  // Common emojis for quick selection
  const commonEmojis = ['😊', '👍', '🎉', '❤️', '😂', '🙌', '👏', '🔥', '✅', '👋', 
                       '🤔', '👀', '🙏', '💪', '⭐', '🚀', '💯', '🤣', '😍', '👌'];
  
  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white/5 rounded-lg p-2">
      <div className="flex items-center">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleAttachment}
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 glass-dark border-white/10 text-white">
            <div className="grid grid-cols-5 gap-2">
              {commonEmojis.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-white/10"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  <span className="text-xl">{emoji}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:outline-none px-3 py-1 text-sm text-white placeholder:text-white/40"
        />
        
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className="text-white/70 hover:text-white hover:bg-white/10"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
