import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-card rounded-xl p-8 shadow-card">
          <h2 className="text-3xl font-bebas text-foreground mb-6">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-inter">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-electric-blue"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-inter">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-electric-blue"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-inter">
                Subject *
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-electric-blue"
                placeholder="How can we help you?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-inter">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-input border-border focus:border-electric-blue resize-none"
                placeholder="Please describe your inquiry in detail..."
              />
            </div>

            <Button
              type="submit"
              variant="electric"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-8 shadow-card">
            <h2 className="text-3xl font-bebas text-foreground mb-6">
              Get in touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-electric-blue/20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-semibold font-inter text-foreground mb-1">
                    Email Support
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    For assistance, please email us at{" "}
                    <a
                      href="mailto:support@fightportal.com"
                      className="text-electric-blue hover:underline"
                    >
                      support@fightportal.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-electric-blue/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-semibold font-inter text-foreground mb-1">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
