import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MyProfile from "./pages/MyProfile";
import Announcements from "./pages/Announcements";
import MyLearning from "./pages/MyLearning";
import MyGoals from "./pages/MyGoals";
import MyDevelopmentPlan from "./pages/MyDevelopmentPlan";
import MyHistory from "./pages/MyHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/my-goals" element={<MyGoals />} />
          <Route path="/my-development-plan" element={<MyDevelopmentPlan />} />
          <Route path="/my-history" element={<MyHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
