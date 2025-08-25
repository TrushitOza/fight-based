import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Welcome back!",
      description: "You have been successfully signed in.",
    });

    // Redirect to home page
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-inter flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bebas text-foreground hover:text-electric-blue transition-colors">
            FIGHTPORTAL
          </Link>
          <p className="text-muted-foreground font-inter mt-2">
            Welcome back to the ultimate fight destination
          </p>
        </div>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bebas text-center text-foreground">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground font-inter">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-inter text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-input border-border focus:border-electric-blue"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-inter text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 bg-input border-border focus:border-electric-blue"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-electric-blue hover:underline font-inter"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                variant="electric" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Separator className="bg-border" />

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-muted-foreground font-inter">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-electric-blue hover:underline font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-inter"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
