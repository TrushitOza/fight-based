import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsEmailSent(true);
    toast({
      title: "Reset email sent!",
      description: "Check your email for password reset instructions.",
    });

    setIsLoading(false);
  };

  const handleBackToSignin = () => {
    navigate("/signin");
  };

  if (isEmailSent) {
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
              Password reset instructions sent
            </p>
          </div>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-electric-blue" />
              </div>
              <CardTitle className="text-2xl font-bebas text-foreground">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-muted-foreground font-inter">
                We've sent password reset instructions to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground font-inter">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <Button 
                  variant="electric-outline" 
                  className="w-full"
                  onClick={() => setIsEmailSent(false)}
                >
                  Try Different Email
                </Button>
                
                <Button 
                  variant="electric" 
                  className="w-full"
                  onClick={handleBackToSignin}
                >
                  Back to Sign In
                </Button>
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
  }

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
            Reset your password
          </p>
        </div>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bebas text-center text-foreground">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground font-inter">
              Enter your email address and we'll send you a link to reset your password
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-input border-border focus:border-electric-blue"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Reset Password Button */}
              <Button 
                type="submit" 
                variant="electric" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleBackToSignin}
                className="text-electric-blue hover:text-electric-blue-dark font-inter"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
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

export default ForgotPassword;
