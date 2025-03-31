
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import WhiteboardComponent from '@/components/whiteboard/Whiteboard';
import ChatPanel from '@/components/chat/ChatPanel';

const Whiteboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Get meeting ID from URL if available
  const meetingId = new URLSearchParams(location.search).get('id');
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <div className="min-h-screen bg-background">
      {meetingId ? (
        // If accessed from a meeting, show a different layout
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="glass-dark border-b border-white/10 px-4 py-3 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/70 hover:text-white"
              onClick={() => navigate(`/meeting?id=${meetingId}`)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back to Meeting</span>
            </Button>
            
            <div className="flex items-center">
              <h2 className="text-sm font-medium">Whiteboard: {meetingId}</h2>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/70 hover:text-white"
              onClick={toggleChat}
            >
              Chat
            </Button>
          </div>
          
          <div className="p-6 h-[calc(100vh-58px)]">
            <WhiteboardComponent className="h-full" />
          </div>
          
          <ChatPanel 
            isOpen={isChatOpen} 
            onClose={toggleChat} 
          />
        </div>
      ) : (
        // Standalone whiteboard page
        <>
          <Navbar />
          
          <main className="container mx-auto px-4 pt-24 pb-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Whiteboard</h1>
              <p className="text-muted-foreground mb-8">
                Use the interactive whiteboard to sketch ideas, draw diagrams, or collaborate with others.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg border border-border/50 h-[calc(100vh-240px)]">
                <WhiteboardComponent className="h-full" />
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Whiteboard;
