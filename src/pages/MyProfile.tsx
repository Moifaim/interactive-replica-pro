import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { Mail, Calendar } from "lucide-react";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
          
          <Card className="bg-[hsl(var(--card-bg))]/60 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Profile Information</CardTitle>
              <CardDescription className="text-white/80">
                Your account details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <Mail className="w-5 h-5" />
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-white/70">Member Since</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
