import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Video, Users, Calendar, Clock, Plus, Copy, Activity, Star, ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';
import MeetingTypeDialog from '@/components/meeting/MeetingTypeDialog';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const meetingData = [
  { name: 'Mon', meetings: 4, hours: 8 },
  { name: 'Tue', meetings: 3, hours: 6 },
  { name: 'Wed', meetings: 5, hours: 10 },
  { name: 'Thu', meetings: 2, hours: 4 },
  { name: 'Fri', meetings: 3, hours: 6 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [meetingTypeDialogOpen, setMeetingTypeDialogOpen] = useState(false);
  
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const meetingIdInput = form.elements.namedItem('meetingId') as HTMLInputElement;
    
    if (meetingIdInput.value.trim()) {
      navigate(`/meeting?id=${meetingIdInput.value.trim()}`);
    } else {
      toast.error('Please enter a meeting ID');
    }
  };
  
  const copyMeetingLink = (meetingId: string) => {
    navigator.clipboard.writeText(`https://yourdomain.com/meeting?id=${meetingId}`);
    toast.success('Meeting link copied to clipboard');
  };
  
  // Mock scheduled meetings
  const scheduledMeetings = [
    { 
      id: 'meet-abc123', 
      title: 'Weekly Team Standup', 
      time: '10:00 AM', 
      date: 'Today', 
      participants: 8 
    },
    { 
      id: 'meet-def456', 
      title: 'Project Review', 
      time: '2:30 PM', 
      date: 'Tomorrow', 
      participants: 5 
    },
    { 
      id: 'meet-ghi789', 
      title: 'Client Presentation', 
      time: '11:00 AM', 
      date: 'Oct 15, 2023', 
      participants: 12 
    },
  ];
  
  // Mock recent meetings
  const recentMeetings = [
    { 
      id: 'meet-jkl012', 
      title: 'Design Workshop', 
      date: 'Yesterday', 
      duration: '1h 45m',
      participants: 7 
    },
    { 
      id: 'meet-mno345', 
      title: 'Marketing Strategy', 
      date: 'Oct 10, 2023', 
      duration: '55m',
      participants: 4 
    },
    { 
      id: 'meet-pqr678', 
      title: 'Engineering Sync', 
      date: 'Oct 9, 2023', 
      duration: '1h 15m',
      participants: 9 
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Dark Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
      
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#818cf8",
            },
            links: {
              color: "#818cf8",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      <Navbar />
      
      <MeetingTypeDialog 
        open={meetingTypeDialogOpen} 
        onOpenChange={setMeetingTypeDialogOpen} 
      />
      
      <main className="container mx-auto px-4 pt-24 pb-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">Welcome back</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Start or join a meeting with just a few clicks</p>
        </div>

        {/* Quick Actions */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 h-14 space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
              onClick={() => setMeetingTypeDialogOpen(true)}
            >
              <Video className="h-6 w-6" />
              <span className="text-lg">New Meeting</span>
            </Button>
            
            <form onSubmit={joinMeeting} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  name="meetingId"
                  placeholder="Enter meeting code" 
                  className="h-14 pl-12 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-full"
                />
              </div>
              <Button type="submit" variant="outline" size="lg" className="h-14 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 rounded-full">
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Scheduled Meetings */}
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Scheduled Meetings</h2>
                  <p className="text-gray-400 mt-1">Your upcoming meetings and events</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>View Calendar</span>
                </Button>
              </div>
              
              {scheduledMeetings.length > 0 ? (
                <div className="grid gap-4">
                  {scheduledMeetings.map((meeting) => (
                    <Card key={meeting.id} className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium text-white text-lg">{meeting.title}</h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{meeting.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{meeting.time}</span>
                            <span className="mx-2">•</span>
                            <Users className="h-4 w-4 mr-2" />
                            <span>{meeting.participants} participants</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 text-gray-400 hover:text-indigo-400"
                            onClick={() => copyMeetingLink(meeting.id)}
                          >
                            <Copy className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10"
                            onClick={() => navigate(`/meeting?id=${meeting.id}`)}
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <p className="text-gray-400 mb-6">No scheduled meetings</p>
                  <Button 
                    onClick={() => setMeetingTypeDialogOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Schedule a Meeting</span>
                  </Button>
                </Card>
              )}
            </section>

            {/* Recent Meetings */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Recent Meetings</h2>
                  <p className="text-gray-400 mt-1">Your past meetings and recordings</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">View All</Button>
              </div>
              
              {recentMeetings.length > 0 ? (
                <div className="grid gap-4">
                  {recentMeetings.map((meeting) => (
                    <Card key={meeting.id} className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-medium text-white text-lg">{meeting.title}</h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{meeting.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{meeting.duration}</span>
                            <span className="mx-2">•</span>
                            <Users className="h-4 w-4 mr-2" />
                            <span>{meeting.participants} participants</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10"
                          onClick={() => copyMeetingLink(meeting.id)}
                        >
                          <Copy className="h-5 w-5 mr-2" />
                          <span>Copy Link</span>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <p className="text-gray-400">No recent meetings</p>
                </Card>
              )}
            </section>
          </div>

          {/* Right Column - Quick Tips & Stats */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Tips */}
            <Card className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Quick Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-500/10 p-2 rounded-full mr-3 mt-0.5">
                    <Star className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="text-gray-300">Test your audio and video before joining</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-500/10 p-2 rounded-full mr-3 mt-0.5">
                    <Star className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="text-gray-300">Use the whiteboard for visual collaboration</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-500/10 p-2 rounded-full mr-3 mt-0.5">
                    <Star className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="text-gray-300">Share the meeting link with participants</span>
                </li>
              </ul>
              <Button variant="link" className="mt-6 pl-0 text-indigo-400 hover:text-indigo-300" asChild>
                <a href="#" className="inline-flex items-center">
                  <span>View all tips</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </Button>
            </Card>

            {/* Meeting Stats */}
            <Card className="p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Meeting Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Meetings</span>
                  <span className="text-white font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Hours in Meetings</span>
                  <span className="text-white font-medium">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Duration</span>
                  <span className="text-white font-medium">2h</span>
                </div>
              </div>
              
              {/* Meeting Stats Graph */}
              <div className="mt-6 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={meetingData}>
                    <defs>
                      <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                        color: '#F3F4F6'
                      }}
                      labelStyle={{ color: '#9CA3AF' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="meetings" 
                      stroke="#818cf8" 
                      fillOpacity={1} 
                      fill="url(#colorMeetings)"
                      name="Meetings"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#a78bfa" 
                      fillOpacity={1} 
                      fill="url(#colorHours)"
                      name="Hours"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
