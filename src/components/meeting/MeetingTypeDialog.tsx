import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video } from 'lucide-react';
import { toast } from 'sonner';

interface MeetingTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MeetingTypeDialog = ({ open, onOpenChange }: MeetingTypeDialogProps) => {
  const navigate = useNavigate();
  
  const createInstantMeeting = () => {
    // Generate a meeting ID
    const meetingId = `meet-${Math.random().toString(36).substring(2, 10)}`;
    navigate(`/meeting?id=${meetingId}`);
  };
  
  const scheduleNewMeeting = () => {
    // This would typically open a form or another dialog for scheduling
    toast.info("Meeting scheduling feature coming soon!");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Start a Meeting</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose what type of meeting you want to create
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center gap-3 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600 group transition-all"
            onClick={createInstantMeeting}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white">Instant Meeting</h3>
              <p className="text-sm text-gray-400 mt-1">Start right now</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center gap-3 bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600 group transition-all"
            onClick={scheduleNewMeeting}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-white">Schedule Meeting</h3>
              <p className="text-sm text-gray-400 mt-1">Plan for later</p>
            </div>
          </Button>
        </div>
        
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingTypeDialog;
