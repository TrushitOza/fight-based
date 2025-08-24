import { Link } from "react-router-dom";
import { Twitter, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Fights", path: "/fights" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-bebas text-foreground">
              FIGHTPORTAL
            </Link>
            <p className="text-muted-foreground font-inter">
              The ultimate destination for fight fans. Live events, exclusive content, and unmissable action.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-inter text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-electric-blue transition-colors duration-200 font-inter"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-inter text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-electric-blue transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-muted-foreground font-inter">
              © 2024 FightPortal. All rights reserved.
            </p>
            <p className="text-muted-foreground font-inter">
              Experience the thrill of combat sports.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};