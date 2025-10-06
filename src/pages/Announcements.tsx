import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

const Announcements = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const announcements = [
    {
      title: "Welcome to Sparrow U!",
      date: "October 6, 2025",
      content: "We're excited to have you join our learning community. Explore your dashboard to get started with your personalized learning journey.",
    },
    {
      title: "New Features Available",
      date: "October 5, 2025",
      content: "Check out the new development planning tools to help you chart your career path and track your progress.",
    },
    {
      title: "Learning Goals Update",
      date: "October 3, 2025",
      content: "Set your quarterly learning goals and connect them with your career objectives for better tracking and accountability.",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Megaphone className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Announcements</h1>
          </div>
          
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <Card key={index} className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{announcement.title}</CardTitle>
                  <CardDescription className="text-white/70">{announcement.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
