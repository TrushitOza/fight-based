import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/PricingPlans";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-6xl font-bebas text-center mb-12 text-foreground">
            Choose Your Plan
          </h1>
          <PricingPlans />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;