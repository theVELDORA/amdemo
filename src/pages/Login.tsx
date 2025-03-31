import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, Mail, LogIn, Video, User, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for testing
      if (email === 'aryansingh@gmail.com' && password === 'aryan') {
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Try aryansingh@gmail.com / aryan');
      }
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!signUpData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    // Add your signup logic here
    toast.success('Account created successfully!');
    setShowSignUp(false);
    setSignUpData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

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

      <div className="container relative h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3">
                <Video className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Appki Meet</h1>
                <p className="text-sm text-gray-400">Connect. Collaborate. Learn.</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-gray-700 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500" />
                  <Label htmlFor="remember" className="text-sm text-gray-300">Remember me</Label>
                </div>
                <Button variant="link" className="text-sm text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Sign in</span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  className="text-indigo-400 hover:text-indigo-300 p-0"
                  onClick={() => setShowSignUp(true)}
                >
                  Sign up
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="max-w-md bg-gray-900/95 backdrop-blur-sm border border-gray-800">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2 z-10 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={() => setShowSignUp(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3">
                <Video className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Create Account</h2>
                <p className="text-sm text-gray-400">Join Appki Meet today</p>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-300">Confirm Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  className="border-gray-700 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  checked={signUpData.agreeToTerms}
                  onCheckedChange={(checked) => setSignUpData({ ...signUpData, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0 h-auto">
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0 h-auto">
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Create Account
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
