import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Mic, Video, Volume2, Monitor, Headphones, BellRing } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [videoDevice, setVideoDevice] = useState('default');
  const [audioInputDevice, setAudioInputDevice] = useState('default');
  const [audioOutputDevice, setAudioOutputDevice] = useState('default');
  const [username, setUsername] = useState('Your Name');
  const [enableHD, setEnableHD] = useState(true);
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [autoJoinAudio, setAutoJoinAudio] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState([80]);
  const [micSensitivity, setMicSensitivity] = useState([70]);

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 max-w-3xl mx-auto shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-white">Settings</h2>
      
      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-gray-800/50 border border-gray-700">
          <TabsTrigger 
            value="audio" 
            className="flex items-center gap-2 data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-400 text-gray-400 hover:text-white"
          >
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">Audio</span>
          </TabsTrigger>
          <TabsTrigger 
            value="video" 
            className="flex items-center gap-2 data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-400 text-gray-400 hover:text-white"
          >
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </TabsTrigger>
          <TabsTrigger 
            value="general" 
            className="flex items-center gap-2 data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-400 text-gray-400 hover:text-white"
          >
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center gap-2 data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-400 text-gray-400 hover:text-white"
          >
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="audio" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audioInput" className="text-gray-300">Microphone</Label>
              <Select 
                value={audioInputDevice} 
                onValueChange={setAudioInputDevice}
              >
                <SelectTrigger id="audioInput" className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select microphone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="default">Default Microphone</SelectItem>
                  <SelectItem value="mic1">Built-in Microphone</SelectItem>
                  <SelectItem value="mic2">External Microphone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audioOutput" className="text-gray-300">Speaker</Label>
              <Select 
                value={audioOutputDevice} 
                onValueChange={setAudioOutputDevice}
              >
                <SelectTrigger id="audioOutput" className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select speaker" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="default">Default Speaker</SelectItem>
                  <SelectItem value="speaker1">Built-in Speaker</SelectItem>
                  <SelectItem value="speaker2">Bluetooth Speaker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-gray-300">Speaker Volume</Label>
                <span className="text-sm text-gray-400">{volume[0]}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-indigo-500 [&_[role=slider]]:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-gray-300">Microphone Sensitivity</Label>
                <span className="text-sm text-gray-400">{micSensitivity[0]}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-gray-400" />
                <Slider
                  value={micSensitivity}
                  onValueChange={setMicSensitivity}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-indigo-500 [&_[role=slider]]:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="noise-reduction" className="text-gray-300">Noise Suppression</Label>
                <p className="text-sm text-gray-400">Reduces background noise when you're speaking</p>
              </div>
              <Switch
                id="noise-reduction"
                checked={noiseReduction}
                onCheckedChange={setNoiseReduction}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-join-audio" className="text-gray-300">Auto-join Audio</Label>
                <p className="text-sm text-gray-400">Automatically join with audio when entering a meeting</p>
              </div>
              <Switch
                id="auto-join-audio"
                checked={autoJoinAudio}
                onCheckedChange={setAutoJoinAudio}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoDevice" className="text-gray-300">Camera</Label>
              <Select 
                value={videoDevice} 
                onValueChange={setVideoDevice}
              >
                <SelectTrigger id="videoDevice" className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="default">Default Camera</SelectItem>
                  <SelectItem value="cam1">Built-in Camera</SelectItem>
                  <SelectItem value="cam2">External Camera</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hd-video" className="text-gray-300">HD Video</Label>
                <p className="text-sm text-gray-400">Enable high-definition video quality</p>
              </div>
              <Switch
                id="hd-video"
                checked={enableHD}
                onCheckedChange={setEnableHD}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
            
            <div className="aspect-video rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center">
              <p className="text-gray-400">Camera Preview (Not available in demo)</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
              <Input
                id="displayName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="text-sm text-gray-400">This name will be visible to others in meetings</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language" className="text-gray-300">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-gray-300">Theme</Label>
              <Select defaultValue="light">
                <SelectTrigger id="theme" className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-enable" className="text-gray-300">Enable Notifications</Label>
                <p className="text-sm text-gray-400">Receive notifications for chat messages and other events</p>
              </div>
              <Switch
                id="notif-enable"
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-sound" className="text-gray-300">Notification Sound</Label>
                <p className="text-sm text-gray-400">Play sound when receiving notifications</p>
              </div>
              <Switch
                id="notif-sound"
                checked={true}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-chat" className="text-gray-300">Chat Notifications</Label>
                <p className="text-sm text-gray-400">Receive notification when someone sends a message</p>
              </div>
              <Switch
                id="notif-chat"
                checked={true}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-join" className="text-gray-300">Join/Leave Notifications</Label>
                <p className="text-sm text-gray-400">Receive notification when someone joins or leaves</p>
              </div>
              <Switch
                id="notif-join"
                checked={true}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-8 gap-3">
        <Button 
          variant="outline" 
          className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800/50"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
