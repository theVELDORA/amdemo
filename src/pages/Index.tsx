import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Video, MessageSquare, PenTool, Users, ChevronRight, ArrowRight, X } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

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

      {/* Hero section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-bottom">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Connect, Collaborate, and Learn in Real Time
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Experience seamless video meetings, interactive whiteboards, and collaborative tools designed for modern education and business.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full px-8 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/login')}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-6 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-105"
                  onClick={() => setShowDemo(true)}
                >
                  View Demo
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-gray-800 bg-gradient-to-br from-indigo-${400 + i*100} to-purple-${400 + i*100} flex items-center justify-center text-white font-medium shadow-lg hover:scale-110 transition-transform duration-300`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-gray-400">Trusted by <span className="font-semibold text-white">500+</span> educational institutions</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative z-10 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                  <div className="col-span-2 aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <Video className="h-10 w-10 text-indigo-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <MessageSquare className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <PenTool className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">All-in-One Communication Solution</h2>
            <p className="text-lg text-gray-300">Discover our powerful features to make your virtual meetings and classes more productive and engaging.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="h-10 w-10 text-white" />,
                title: "HD Video Conferencing",
                description: "Crystal clear video calls with up to 100 participants at once.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: <PenTool className="h-10 w-10 text-white" />,
                title: "Interactive Whiteboard",
                description: "Collaborate in real-time with drawing tools and AI assistance.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-white" />,
                title: "Live Chat & Messaging",
                description: "Communicate through text with public and private messaging.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: <Users className="h-10 w-10 text-white" />,
                title: "Classroom Management",
                description: "Take attendance, manage permissions, and control the learning environment.",
                color: "from-rose-500 to-orange-500"
              },
              {
                icon: <Users className="h-10 w-10 text-white" />,
                title: "Breakout Rooms",
                description: "Split participants into smaller groups for focused discussions.",
                color: "from-orange-500 to-amber-500"
              },
              {
                icon: <Users className="h-10 w-10 text-white" />,
                title: "Cloud Recording",
                description: "Record and save your meetings for future reference and sharing.",
                color: "from-amber-500 to-yellow-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-lg mb-5 bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <Button 
                  variant="ghost" 
                  className="px-0 text-indigo-400 hover:text-indigo-300 hover:bg-transparent"
                  onClick={() => navigate('/dashboard')}
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your virtual meetings?</h2>
            <p className="text-xl text-indigo-100 mb-8">Join thousands of educators and professionals using our platform.</p>
            <Button 
              size="lg"
              className="rounded-full px-8 py-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
              onClick={() => navigate('/login')}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3">
                <Video className="h-5 w-5 text-indigo-400" />
              </div>
              <span className="text-xl font-bold text-white">Appki Meet</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Appki Meet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-sm border border-gray-800">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2 z-10 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={() => setShowDemo(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
            <div className="aspect-video rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
                src="/demo video.mp4"
                title="Appki Meet Demo"
              >
              </video>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
