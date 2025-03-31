import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, MicOff, Video, VideoOff, Users, PenTool, 
  MessageSquare, Share2, MoreVertical, PhoneOff, 
  LayoutGrid, Settings, Bot, Sparkles, Layout, Grid, List,
  Monitor, AppWindow, Globe, Smartphone, StopCircle,
  UserPlus, UserMinus, Mic2, Crown, Shield, MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatBot from '@/components/chat/ChatBot';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MeetingControlsProps {
  className?: string;
  onToggleChat?: () => void;
  onToggleParticipants?: () => void;
  onToggleWhiteboard?: () => void;
  onLayoutChange?: (layout: 'grid' | 'speaker' | 'list') => void;
}

// Mock participants data
const mockParticipants = [
  { id: 1, name: 'John Doe', role: 'Host', avatar: '/avatars/john.jpg', isMuted: false, isVideoOff: false },
  { id: 2, name: 'Jane Smith', role: 'Co-host', avatar: '/avatars/jane.jpg', isMuted: true, isVideoOff: false },
  { id: 3, name: 'Mike Johnson', role: 'Participant', avatar: '/avatars/mike.jpg', isMuted: false, isVideoOff: true },
  { id: 4, name: 'Sarah Wilson', role: 'Participant', avatar: '/avatars/sarah.jpg', isMuted: true, isVideoOff: true },
];

const MeetingControls: React.FC<MeetingControlsProps> = ({ 
  className,
  onToggleChat,
  onToggleParticipants,
  onToggleWhiteboard,
  onLayoutChange
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<'grid' | 'speaker' | 'list'>('grid');
  const [isSharing, setIsSharing] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMic = () => {
    setMicMuted(!micMuted);
    toast(micMuted ? 'Microphone unmuted' : 'Microphone muted');
  };

  const toggleVideo = () => {
    setVideoOff(!videoOff);
    toast(videoOff ? 'Camera turned on' : 'Camera turned off');
  };

  const shareScreen = () => {
    toast('Screen sharing started');
  };

  const endCall = () => {
    toast('Call ended');
    navigate('/dashboard');
  };

  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
    if (!isChatBotOpen) {
      toast('AI Assistant activated');
    }
  };

  const handleLayoutChange = (layout: 'grid' | 'speaker' | 'list') => {
    setCurrentLayout(layout);
    onLayoutChange?.(layout);
    toast(`Layout changed to ${layout} view`);
  };

  const startSharing = (type: 'screen' | 'window' | 'tab' | 'mobile') => {
    setIsSharing(true);
    toast.success(`Started sharing ${type}`);
    // Here you would implement the actual screen sharing logic
  };

  const stopSharing = () => {
    setIsSharing(false);
    toast.success('Stopped sharing');
    // Here you would implement the actual stop sharing logic
  };

  const handleParticipantAction = (action: string, participantId: number) => {
    toast.success(`${action} for participant ${participantId}`);
    // Implement actual participant action logic here
  };

  return (
    <>
      <div className={`glass-dark rounded-full p-2 flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}>
        <Button 
          variant={micMuted ? "destructive" : "default"} 
          size="icon" 
          className="rounded-full w-10 h-10 transition-all duration-200 shadow-lg hover:scale-105"
          onClick={toggleMic}
        >
          {micMuted ? (
            <MicOff className="w-5 h-5 text-red-400" />
          ) : (
            <Mic className="w-5 h-5 text-indigo-400" />
          )}
        </Button>
        
        <Button 
          variant={videoOff ? "destructive" : "default"} 
          size="icon" 
          className="rounded-full w-10 h-10 transition-all duration-200 shadow-lg hover:scale-105"
          onClick={toggleVideo}
        >
          {videoOff ? (
            <VideoOff className="w-5 h-5 text-red-400" />
          ) : (
            <Video className="w-5 h-5 text-indigo-400" />
          )}
        </Button>
        
        <DropdownMenu open={isParticipantsOpen} onOpenChange={setIsParticipantsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full w-10 h-10 hidden sm:flex shadow-lg hover:scale-105 hover:bg-indigo-500/10"
            >
              <div className="relative">
                <Users className="w-5 h-5 text-indigo-400" />
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {mockParticipants.length}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-gray-900/95 backdrop-blur-sm border border-gray-800">
            <div className="flex items-center justify-between p-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-medium">Participants ({mockParticipants.length})</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <UserPlus className="w-4 h-4 text-indigo-400" />
              </Button>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {mockParticipants.map((participant) => (
                <div key={participant.id} className="group">
                  <DropdownMenuItem className="flex items-center justify-between p-3 hover:bg-indigo-500/10 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="bg-indigo-500/10 text-indigo-400">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white">{participant.name}</span>
                          {participant.role === 'Host' && (
                            <Crown className="w-3 h-3 text-yellow-400" />
                          )}
                          {participant.role === 'Co-host' && (
                            <Shield className="w-3 h-3 text-indigo-400" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{participant.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {participant.isMuted ? (
                          <Mic2 className="w-4 h-4 text-red-400" />
                        ) : (
                          <Mic className="w-4 h-4 text-green-400" />
                        )}
                        {participant.isVideoOff ? (
                          <VideoOff className="w-4 h-4 text-red-400" />
                        ) : (
                          <Video className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-800">
                            <DropdownMenuItem 
                              className="text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
                              onClick={() => handleParticipantAction('Mute', participant.id)}
                            >
                              <MicOff className="w-4 h-4 mr-2 text-indigo-400" />
                              <span>Mute</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
                              onClick={() => handleParticipantAction('Stop Video', participant.id)}
                            >
                              <VideoOff className="w-4 h-4 mr-2 text-indigo-400" />
                              <span>Stop Video</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
                              onClick={() => handleParticipantAction('Remove', participant.id)}
                            >
                              <UserMinus className="w-4 h-4 mr-2 text-red-400" />
                              <span className="text-red-400">Remove</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </div>
                  </DropdownMenuItem>
                </div>
              ))}
            </div>

            <DropdownMenuSeparator className="bg-gray-800" />
            
            <div className="p-3">
              <Button 
                variant="outline" 
                className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-indigo-500/10 hover:text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite People
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full w-10 h-10 shadow-lg hover:scale-105 hover:bg-indigo-500/10"
          onClick={onToggleChat}
        >
          <MessageSquare className="w-5 h-5 text-indigo-400" />
        </Button>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full w-10 h-10 hidden sm:flex shadow-lg hover:scale-105 hover:bg-indigo-500/10"
          onClick={onToggleWhiteboard}
        >
          <PenTool className="w-5 h-5 text-indigo-400" />
        </Button>
        
        {/* Enhanced Share Screen Button */}
        {isSharing ? (
          <Button 
            variant="destructive" 
            size="icon" 
            className="rounded-full w-10 h-10 hidden md:flex shadow-lg hover:scale-105 hover:bg-red-500/10"
            onClick={stopSharing}
          >
            <StopCircle className="w-5 h-5 text-red-400" />
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full w-10 h-10 hidden md:flex shadow-lg hover:scale-105 hover:bg-indigo-500/10"
              >
                <Share2 className="w-5 h-5 text-indigo-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-800">
              <DropdownMenuLabel className="text-gray-400 text-sm font-normal">
                Share your screen
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              
              <DropdownMenuItem 
                className="flex items-center space-x-3 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer py-3"
                onClick={() => startSharing('screen')}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Entire Screen</span>
                  <span className="text-xs text-gray-400">Share your entire screen</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center space-x-3 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer py-3"
                onClick={() => startSharing('window')}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <AppWindow className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Application Window</span>
                  <span className="text-xs text-gray-400">Share a specific window</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center space-x-3 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer py-3"
                onClick={() => startSharing('tab')}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Browser Tab</span>
                  <span className="text-xs text-gray-400">Share a browser tab</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center space-x-3 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer py-3"
                onClick={() => startSharing('mobile')}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Mobile Screen</span>
                  <span className="text-xs text-gray-400">Share from your mobile device</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Layout Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full w-10 h-10 hidden md:flex shadow-lg hover:scale-105 hover:bg-indigo-500/10"
            >
              <Layout className="w-5 h-5 text-indigo-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-900/95 backdrop-blur-sm border border-gray-800">
            <DropdownMenuItem 
              className="flex items-center space-x-2 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
              onClick={() => handleLayoutChange('grid')}
            >
              <Grid className="w-4 h-4 text-indigo-400" />
              <span>Grid View</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center space-x-2 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
              onClick={() => handleLayoutChange('speaker')}
            >
              <Layout className="w-4 h-4 text-indigo-400" />
              <span>Speaker View</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center space-x-2 text-gray-100 hover:bg-indigo-500/10 hover:text-white cursor-pointer"
              onClick={() => handleLayoutChange('list')}
            >
              <List className="w-4 h-4 text-indigo-400" />
              <span>List View</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* AI Assistant Button */}
        <Button 
          variant={isChatBotOpen ? "default" : "secondary"}
          size="icon" 
          className="rounded-full w-10 h-10 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105 transition-all duration-200"
          onClick={toggleChatBot}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </Button>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full w-10 h-10 hidden sm:flex shadow-lg hover:scale-105 hover:bg-indigo-500/10"
          asChild
        >
          <a href="/settings">
            <Settings className="w-5 h-5 text-indigo-400" />
          </a>
        </Button>
        
        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full w-10 h-10 shadow-lg hover:scale-105 hover:bg-red-500/10"
          onClick={endCall}
        >
          <PhoneOff className="w-5 h-5 text-red-400" />
        </Button>
      </div>

      {/* AI ChatBot */}
      <ChatBot 
        isOpen={isChatBotOpen} 
        onClose={() => setIsChatBotOpen(false)} 
      />
    </>
  );
};

export default MeetingControls;
