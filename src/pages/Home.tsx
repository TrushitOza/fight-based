import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { WhatsOnSection } from "@/components/WhatsOnSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main>
        <HeroSection />
        <WhatsOnSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;