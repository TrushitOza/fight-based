import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

export const PricingPlans = () => {
  const features = [
    "All live events",
    "Unlimited on-demand library", 
    "HD streaming quality",
    "Multi-device access",
    "Download for offline viewing",
    "Exclusive behind-the-scenes content",
    "No ads during events",
    "Cancel anytime"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Plan */}
        <div className="bg-card rounded-xl p-8 shadow-card hover:shadow-electric transition-all duration-300">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bebas text-foreground mb-4">
              Monthly Pass
            </h3>
            <div className="mb-6">
              <span className="text-5xl font-bebas text-electric-blue">$19.99</span>
              <span className="text-muted-foreground font-inter">/month</span>
            </div>
            <p className="text-muted-foreground font-inter">
              Perfect for trying out our premium fight content
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                <span className="font-inter text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button variant="electric-outline" className="w-full" size="lg">
            Choose Monthly
          </Button>
        </div>

        {/* Annual Plan (Best Value) */}
        <div className="bg-card rounded-xl p-8 shadow-card hover:shadow-electric transition-all duration-300 relative border-2 border-electric-blue">
          {/* Best Value Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-electric px-6 py-2 rounded-full flex items-center space-x-2">
              <Star className="w-4 h-4 text-white" />
              <span className="text-white font-semibold font-inter">Best Value</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-3xl font-bebas text-foreground mb-4">
              Annual Pass
            </h3>
            <div className="mb-2">
              <span className="text-5xl font-bebas text-electric-blue">$199.99</span>
              <span className="text-muted-foreground font-inter">/year</span>
            </div>
            <div className="mb-6">
              <span className="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-sm font-inter">
                Save $40 per year
              </span>
            </div>
            <p className="text-muted-foreground font-inter">
              Best value for dedicated fight fans
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                <span className="font-inter text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button variant="electric" className="w-full" size="lg">
            Choose Annual
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-12 space-y-4">
        <p className="text-muted-foreground font-inter">
          All plans include a 7-day free trial. No commitment required.
        </p>
        <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-muted-foreground font-inter">
          <span>✓ Secure payment</span>
          <span>✓ Instant access</span>
          <span>✓ 24/7 support</span>
          <span>✓ Money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};