import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Meeting from "./pages/Meeting";
import ClassroomMeeting from "./pages/ClassroomMeeting";
import Whiteboard from "./pages/Whiteboard";
import SettingsPanel from "./components/settings/SettingsPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SettingsRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 pt-20 px-4">
      <SettingsPanel onClose={() => navigate(-1)} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/classroom" element={<ClassroomMeeting />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/settings" element={<SettingsRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
