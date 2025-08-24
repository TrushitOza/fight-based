import { Tv, Smartphone, Crown, UserX } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Tv,
      title: "Live & On-Demand",
      description: "Watch live events as they happen or catch up with our extensive on-demand library."
    },
    {
      icon: Smartphone,
      title: "All Your Devices",
      description: "Stream seamlessly on your TV, laptop, tablet, or smartphone wherever you are."
    },
    {
      icon: Crown,
      title: "Exclusive Content",
      description: "Access exclusive interviews, behind-the-scenes content, and fighter documentaries."
    },
    {
      icon: UserX,
      title: "No Contracts",
      description: "Cancel anytime with no hidden fees or long-term commitments required."
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
            Stream Anywhere, Cancel Anytime
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Experience the ultimate freedom in fight entertainment with our premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-electric rounded-full flex items-center justify-center shadow-electric group-hover:shadow-lg transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bebas text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};