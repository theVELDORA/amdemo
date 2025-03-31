
import React, { useState, useEffect } from 'react';
import ParticipantVideo from './ParticipantVideo';

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  isHost: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  avatarUrl?: string;
}

interface VideoGridProps {
  className?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ className }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  // Mock data for demonstration
  useEffect(() => {
    const mockParticipants: Participant[] = [
      {
        id: '1',
        name: 'You',
        isSpeaking: false,
        isHost: true,
        isMuted: false,
        isVideoOff: false,
      },
      {
        id: '2',
        name: 'Alex Johnson',
        isSpeaking: true,
        isHost: false,
        isMuted: false,
        isVideoOff: false,
      },
      {
        id: '3',
        name: 'Sarah Williams',
        isSpeaking: false,
        isHost: false,
        isMuted: true,
        isVideoOff: false,
      },
      {
        id: '4',
        name: 'Michael Chen',
        isSpeaking: false,
        isHost: false,
        isMuted: false,
        isVideoOff: true,
        avatarUrl: 'https://i.pravatar.cc/300?img=11'
      },
    ];
    
    setParticipants(mockParticipants);
    
    // Simulate random speaking
    const interval = setInterval(() => {
      setParticipants(prev => 
        prev.map(p => ({
          ...p,
          isSpeaking: p.id === String(Math.floor(Math.random() * 4) + 1) && !p.isMuted
        }))
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate grid layout based on participant count
  const getGridTemplateColumns = () => {
    const count = participants.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };
  
  return (
    <div className={`grid gap-4 ${getGridTemplateColumns()} ${className}`}>
      {participants.map(participant => (
        <ParticipantVideo
          key={participant.id}
          participant={participant}
          isLocal={participant.id === '1'}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
