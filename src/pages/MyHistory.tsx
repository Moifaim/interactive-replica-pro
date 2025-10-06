import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Award, BookOpen, Target } from "lucide-react";

const MyHistory = () => {
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

  const historyItems = [
    {
      type: "completion",
      title: "Completed: Advanced Communication Skills",
      date: "September 15, 2025",
      icon: Award,
      description: "Successfully completed the Advanced Communication Skills course with distinction.",
    },
    {
      type: "goal",
      title: "Goal Achieved: Public Speaking Milestone",
      date: "September 10, 2025",
      icon: Target,
      description: "Delivered successful presentation to company leadership team.",
    },
    {
      type: "enrollment",
      title: "Enrolled: Project Management Fundamentals",
      date: "September 1, 2025",
      icon: BookOpen,
      description: "Started new course in project management methodologies.",
    },
    {
      type: "completion",
      title: "Completed: Introduction to Data Analysis",
      date: "August 25, 2025",
      icon: Award,
      description: "Finished foundational course in data analysis techniques.",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <History className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">My History</h1>
          </div>
          
          <p className="text-white/90 text-lg mb-8">
            View and manage your learning history. Review your completed courses, achievements, and milestones.
          </p>

          <div className="space-y-6">
            {historyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-white">{item.title}</CardTitle>
                        <CardDescription className="text-white/70">{item.date}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHistory;
