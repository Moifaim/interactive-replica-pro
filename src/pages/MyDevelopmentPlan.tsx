import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp } from "lucide-react";

const MyDevelopmentPlan = () => {
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

  const developmentAreas = [
    {
      area: "Technical Skills",
      focus: "Data Analysis & Visualization",
      actions: [
        "Complete advanced Excel training",
        "Learn Python for data science",
        "Master Tableau dashboard creation",
      ],
    },
    {
      area: "Leadership Skills",
      focus: "Team Management & Communication",
      actions: [
        "Attend leadership workshops",
        "Practice active listening techniques",
        "Lead cross-functional projects",
      ],
    },
    {
      area: "Professional Development",
      focus: "Career Advancement",
      actions: [
        "Earn professional certifications",
        "Build professional network",
        "Develop mentorship relationships",
      ],
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">My Development Plan</h1>
          </div>
          
          <p className="text-white/90 text-lg mb-8">
            View and manage your development plan. Create a roadmap for your professional growth and career advancement.
          </p>

          <div className="space-y-6">
            {developmentAreas.map((area, index) => (
              <Card key={index} className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-white">{area.area}</CardTitle>
                      <CardDescription className="text-white/70">
                        Focus: {area.focus}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {area.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center gap-2 text-white/90">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDevelopmentPlan;
