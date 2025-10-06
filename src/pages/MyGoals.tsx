import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle2, Circle } from "lucide-react";

const MyGoals = () => {
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

  const goals = [
    {
      title: "Complete Leadership Certification",
      deadline: "December 2025",
      completed: false,
      description: "Earn professional certification in leadership and management.",
    },
    {
      title: "Master Data Analysis Tools",
      deadline: "November 2025",
      completed: false,
      description: "Become proficient in advanced data analysis and visualization.",
    },
    {
      title: "Improve Public Speaking",
      deadline: "January 2026",
      completed: false,
      description: "Develop confidence and skills in public presentations.",
    },
    {
      title: "Complete Communication Course",
      deadline: "September 2025",
      completed: true,
      description: "Successfully completed advanced communication training.",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">My Goals</h1>
          </div>
          
          <p className="text-white/90 text-lg mb-8">
            View and manage your career goals. Set objectives and track your progress toward achieving them.
          </p>

          <div className="space-y-6">
            {goals.map((goal, index) => (
              <Card key={index} className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {goal.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-white/50" />
                      )}
                      <div>
                        <CardTitle className="text-white">{goal.title}</CardTitle>
                        <CardDescription className="text-white/70">
                          Target: {goal.deadline}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGoals;
