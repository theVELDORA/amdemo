
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoGrid from '@/components/video/VideoGrid';
import MeetingControls from '@/components/layout/MeetingControls';
import ChatPanel from '@/components/chat/ChatPanel';
import Whiteboard from '@/components/whiteboard/Whiteboard';
import { Button } from '@/components/ui/button';
import { Users, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Meeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  
  // Extract meeting ID from URL
  const meetingId = new URLSearchParams(location.search).get('id') || 'unknown';
  
  // Mock participants data
  const [participants, setParticipants] = useState([
    { id: '1', name: 'You', isHost: true, isMuted: false, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Alex Johnson', isHost: false, isMuted: false, avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Sarah Williams', isHost: false, isMuted: true, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Michael Chen', isHost: false, isMuted: false, avatarUrl: 'https://i.pravatar.cc/150?img=4' },
  ]);
  
  // Show toast with meeting info when joining
  useEffect(() => {
    toast.success(`Joined meeting: ${meetingId}`);
  }, [meetingId]);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      document.body.style.overflow = 'auto';
    } else {
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }
  };
  
  const toggleParticipants = () => {
    setIsParticipantsOpen(!isParticipantsOpen);
  };
  
  const toggleWhiteboard = () => {
    setIsWhiteboardOpen(!isWhiteboardOpen);
    if (isWhiteboardOpen) {
      navigate(`/meeting?id=${meetingId}`);
    } else {
      navigate(`/whiteboard?id=${meetingId}`);
    }
  };
  
  const copyMeetingLink = () => {
    const url = `${window.location.origin}/meeting?id=${meetingId}`;
    navigator.clipboard.writeText(url);
    toast.success('Meeting link copied to clipboard');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail.trim()) return;
    
    // Mock adding a new participant
    const newParticipant = {
      id: (participants.length + 1).toString(),
      name: inviteEmail.split('@')[0], // Use part of email as name
      isHost: false,
      isMuted: false,
      avatarUrl: `https://i.pravatar.cc/150?img=${participants.length + 5}`,
    };
    
    setParticipants([...participants, newParticipant]);
    
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setIsInviteDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Main content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Meeting info bar */}
        <div className="glass-dark border-b border-white/10 px-4 py-3 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/70 hover:text-white"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center">
            <h2 className="text-sm font-medium">Meeting ID: {meetingId}</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 text-white/70 hover:text-white"
              onClick={copyMeetingLink}
            >
              Copy Link
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
              onClick={() => setIsInviteDialogOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Invite</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
              onClick={toggleParticipants}
            >
              <Users className="h-4 w-4 mr-1" />
              <span>{participants.length}</span>
            </Button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex">
          {/* Participants panel */}
          <div 
            className={`fixed md:relative inset-y-0 left-0 z-30 w-64 glass-dark border-r border-white/10 transform transition-transform duration-300 ${
              isParticipantsOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-medium">Participants ({participants.length})</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={toggleParticipants}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-64px)]">
              <div className="p-4 space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                        <AvatarFallback>
                          {participant.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-sm font-medium">
                          {participant.name} {participant.isHost && '(Host)'}
                        </p>
                      </div>
                    </div>
                    
                    {participant.isMuted && (
                      <span className="text-xs bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                        Muted
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div className="flex-1 flex flex-col p-4">
            {isWhiteboardOpen ? (
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-medium mb-4">Collaborative Whiteboard</h3>
                <Whiteboard className="flex-1" />
              </div>
            ) : (
              <VideoGrid className="flex-1" />
            )}
            
            <div className="flex justify-center mt-6">
              <MeetingControls 
                onToggleChat={toggleChat}
                onToggleParticipants={toggleParticipants}
                onToggleWhiteboard={toggleWhiteboard}
              />
            </div>
          </div>
          
          {/* Mobile participant toggle button */}
          {!isParticipantsOpen && (
            <Button
              variant="secondary"
              size="icon"
              className="md:hidden fixed left-0 top-1/2 transform -translate-y-1/2 rounded-l-none rounded-r-lg z-20"
              onClick={toggleParticipants}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Chat panel */}
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={toggleChat} 
      />
      
      {/* Invite dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="glass-dark border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Invite to Meeting</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter email address to send meeting invitation.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInviteSubmit}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  placeholder="example@email.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="secondary" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meeting;
