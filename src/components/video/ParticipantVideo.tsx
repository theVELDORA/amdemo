
import React from 'react';
import { Mic, MicOff, Crown, Pin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  isHost: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  avatarUrl?: string;
}

interface ParticipantVideoProps {
  participant: Participant;
  isLocal: boolean;
}

const ParticipantVideo: React.FC<ParticipantVideoProps> = ({ participant, isLocal }) => {
  const { name, isSpeaking, isHost, isMuted, isVideoOff, avatarUrl } = participant;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
        isSpeaking ? 'ring-2 ring-primary' : 'ring-1 ring-border/50'
      }`}
    >
      {/* Video or avatar placeholder */}
      {isVideoOff ? (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <Avatar className="w-24 h-24">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="w-full h-full bg-black">
          {/* This would be replaced with actual video stream */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-white/50 text-sm">Video Feed</span>
          </div>
        </div>
      )}
      
      {/* Overlay with name and controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isHost && (
              <span className="mr-1.5">
                <Crown className="w-3.5 h-3.5 text-yellow-400" />
              </span>
            )}
            <span className="text-white text-sm font-medium truncate">
              {name} {isLocal && '(You)'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {isMuted ? (
              <MicOff className="w-4 h-4 text-red-400" />
            ) : (
              <Mic className={`w-4 h-4 ${isSpeaking ? 'text-green-400' : 'text-white'}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantVideo;
