import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

const MyLearning = () => {
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

  const courses = [
    { title: "Introduction to Leadership", progress: 75, status: "In Progress" },
    { title: "Advanced Communication Skills", progress: 100, status: "Completed" },
    { title: "Project Management Fundamentals", progress: 45, status: "In Progress" },
    { title: "Data Analysis Basics", progress: 30, status: "In Progress" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">My Learning</h1>
          </div>
          
          <p className="text-white/90 text-lg mb-8">
            View and manage your learning dashboard. Track your progress across all courses and certifications.
          </p>

          <div className="space-y-6">
            {courses.map((course, index) => (
              <Card key={index} className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">{course.title}</CardTitle>
                  <CardDescription className="text-white/70">{course.status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/90">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
