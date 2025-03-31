import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoGrid from '@/components/video/VideoGrid';
import MeetingControls from '@/components/layout/MeetingControls';
import ChatPanel from '@/components/chat/ChatPanel';
import Whiteboard from '@/components/whiteboard/Whiteboard';
import { Button } from '@/components/ui/button';
import { 
  Users, ChevronLeft, ChevronRight, 
  ClipboardCheck, UserPlus, Hand, MessageSquareOff 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  isMuted: boolean;
  isPresent: boolean;
  handRaised: boolean;
  isChatDisabled: boolean;
  avatarUrl?: string;
}

const ClassroomMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [allChatDisabled, setAllChatDisabled] = useState(false);
  
  const meetingId = new URLSearchParams(location.search).get('id') || 'unknown';
  
  useEffect(() => {
    const mockParticipants: Participant[] = [
      { 
        id: '1', 
        name: 'You (Professor)', 
        isHost: true, 
        isMuted: false, 
        isPresent: true,
        handRaised: false,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=1' 
      },
      { 
        id: '2', 
        name: 'Alex Johnson', 
        isHost: false, 
        isMuted: false, 
        isPresent: true,
        handRaised: false,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=2' 
      },
      { 
        id: '3', 
        name: 'Sarah Williams', 
        isHost: false, 
        isMuted: true, 
        isPresent: true,
        handRaised: true,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=3' 
      },
      { 
        id: '4', 
        name: 'Michael Chen', 
        isHost: false, 
        isMuted: false, 
        isPresent: true,
        handRaised: false,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=4' 
      },
      { 
        id: '5', 
        name: 'Jessica Taylor', 
        isHost: false, 
        isMuted: true, 
        isPresent: false,
        handRaised: false,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=5' 
      },
      { 
        id: '6', 
        name: 'David Kim', 
        isHost: false, 
        isMuted: true, 
        isPresent: true,
        handRaised: false,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=6' 
      },
      { 
        id: '7', 
        name: 'Emma Rodriguez', 
        isHost: false, 
        isMuted: false, 
        isPresent: true,
        handRaised: true,
        isChatDisabled: false,
        avatarUrl: 'https://i.pravatar.cc/150?img=7' 
      },
    ];
    
    setParticipants(mockParticipants);
    
    toast.success(`Joined classroom meeting: ${meetingId}`);
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
  };
  
  const toggleAttendance = (id: string) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isPresent: !p.isPresent } : p
      )
    );
    
    const participant = participants.find(p => p.id === id);
    if (participant) {
      toast.success(`Marked ${participant.name} as ${!participant.isPresent ? 'present' : 'absent'}`);
    }
  };
  
  const toggleParticipantMute = (id: string) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isMuted: !p.isMuted } : p
      )
    );
    
    const participant = participants.find(p => p.id === id);
    if (participant) {
      toast.success(`${participant.name} is now ${!participant.isMuted ? 'muted' : 'unmuted'}`);
    }
  };
  
  const toggleParticipantChat = (id: string) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isChatDisabled: !p.isChatDisabled } : p
      )
    );
    
    const participant = participants.find(p => p.id === id);
    if (participant) {
      toast.success(`Chat for ${participant.name} is now ${!participant.isChatDisabled ? 'disabled' : 'enabled'}`);
    }
  };
  
  const toggleAllChat = () => {
    setAllChatDisabled(!allChatDisabled);
    setParticipants(prev => 
      prev.map(p => 
        p.isHost ? p : { ...p, isChatDisabled: !allChatDisabled }
      )
    );
    
    toast.success(`Chat for all students is now ${!allChatDisabled ? 'disabled' : 'enabled'}`);
  };
  
  const muteAll = () => {
    setParticipants(prev => 
      prev.map(p => 
        p.isHost ? p : { ...p, isMuted: true }
      )
    );
    
    toast.success('All students have been muted');
  };
  
  const presentStudents = participants.filter(p => p.isPresent && !p.isHost);
  const absentStudents = participants.filter(p => !p.isPresent && !p.isHost);
  const raisedHands = participants.filter(p => p.handRaised);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="relative min-h-screen flex flex-col">
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
            <h2 className="text-sm font-medium">Classroom: {meetingId}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
              onClick={toggleAllChat}
            >
              <MessageSquareOff className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{allChatDisabled ? 'Enable Chat' : 'Disable Chat'}</span>
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
        
        <div className="flex-1 flex">
          <div 
            className={`fixed md:relative inset-y-0 left-0 z-30 w-72 glass-dark border-r border-white/10 transform transition-transform duration-300 ${
              isParticipantsOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-medium">Class Participants</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={toggleParticipants}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 mx-4 mt-2">
                <TabsTrigger value="all">All ({participants.length - 1})</TabsTrigger>
                <TabsTrigger value="present">Present ({presentStudents.length})</TabsTrigger>
                <TabsTrigger value="hands">Hands ({raisedHands.length})</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(100vh-148px)]">
                <TabsContent value="all" className="m-0">
                  <div className="p-4 space-y-3">
                    {participants.filter(p => !p.isHost).map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                              <AvatarFallback>
                                {participant.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {participant.handRaised && (
                              <span className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                                <Hand className="h-3 w-3 text-white" />
                              </span>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">
                              {participant.name}
                            </p>
                            <div className="flex items-center space-x-2 mt-0.5">
                              {participant.isMuted && (
                                <span className="text-xs bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                                  Muted
                                </span>
                              )}
                              {participant.isChatDisabled && (
                                <span className="text-xs bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                                  Chat Disabled
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1.5C1.5 2.32843 2.17157 3 3 3C3.82843 3 4.5 2.32843 4.5 1.5C4.5 0.671573 3.82843 0 3 0C2.17157 0 1.5 0.671573 1.5 1.5Z" fill="currentColor"/>
                                <path d="M6 1.5C6 2.32843 6.67157 3 7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5Z" fill="currentColor"/>
                                <path d="M10.5 1.5C10.5 2.32843 11.1716 3 12 3C12.8284 3 13.5 2.32843 13.5 1.5C13.5 0.671573 12.8284 0 12 0C11.1716 0 10.5 0.671573 10.5 1.5Z" fill="currentColor"/>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-dark border-white/10 text-white/90">
                            <DropdownMenuItem onClick={() => toggleParticipantMute(participant.id)}>
                              {participant.isMuted ? 'Unmute' : 'Mute'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleParticipantChat(participant.id)}>
                              {participant.isChatDisabled ? 'Enable Chat' : 'Disable Chat'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleAttendance(participant.id)}>
                              Mark as {participant.isPresent ? 'Absent' : 'Present'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="present" className="m-0">
                  <div className="p-4 space-y-3">
                    {presentStudents.length > 0 ? (
                      presentStudents.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`attendance-${participant.id}`} 
                            checked={participant.isPresent}
                            onCheckedChange={() => toggleAttendance(participant.id)}
                          />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                            <AvatarFallback>
                              {participant.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <label 
                            htmlFor={`attendance-${participant.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {participant.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/50 text-center py-4">No students present</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="hands" className="m-0">
                  <div className="p-4 space-y-3">
                    {raisedHands.length > 0 ? (
                      raisedHands.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                                <AvatarFallback>
                                  {participant.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                                <Hand className="h-3 w-3 text-white" />
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">
                                {participant.name}
                              </p>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            Call On
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/50 text-center py-4">No raised hands</p>
                    )}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 glass-dark border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={muteAll} variant="outline" size="sm" className="w-full">
                  Mute All
                </Button>
                <Button onClick={() => {}} variant="outline" size="sm" className="w-full">
                  Take Attendance
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-4">
            {isWhiteboardOpen ? (
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-medium mb-4">Classroom Whiteboard</h3>
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
      
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={toggleChat} 
      />
    </div>
  );
};

export default ClassroomMeeting;
