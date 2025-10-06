import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Target, FileText, History } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import heroBackground from "@/assets/hero-background.png";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const features = [
    {
      title: "My Learning",
      description: "View and manage your learning dashboard.",
      icon: BookOpen,
      link: "/my-learning",
    },
    {
      title: "My Goals",
      description: "View and manage your career goals.",
      icon: Target,
      link: "/my-goals",
    },
    {
      title: "My Development Plan",
      description: "View and manage your development plan.",
      icon: FileText,
      link: "/my-development-plan",
    },
    {
      title: "My History",
      description: "View and manage your learning history.",
      icon: History,
      link: "/my-history",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen relative pt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))]/90 to-[hsl(var(--hero-gradient-end))]/90" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to Sparrow U
            </h1>
            <p className="text-xl text-white/90 mb-8">
              View and manage your career and learning experience.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/my-profile">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  My Profile
                </Button>
              </Link>
              <Link to="/announcements">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Announcements
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.link}>
                  <Card className="h-full bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30 hover:border-white/50 transition-all hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <Icon className="w-8 h-8 text-white mb-2" />
                      <CardTitle className="text-white text-xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/80 mb-4">
                        {feature.description}
                      </CardDescription>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
