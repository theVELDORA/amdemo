import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Video, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <NavLink to="/" className="font-semibold text-xl tracking-tight text-white mr-6 flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Video className="w-6 h-6 text-indigo-400 animate-pulse-subtle" />
                <div className="absolute -inset-1 rounded-full bg-indigo-500/20 animate-ping opacity-75"></div>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-bold">Appki Meet</span>
            </NavLink>
            
            <nav className="hidden md:flex space-x-1">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-500/10 text-indigo-400' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center text-gray-400 hover:text-white hover:bg-gray-800/50"
              asChild
            >
              <NavLink to="/settings">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </NavLink>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
