import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FightSchedule } from "@/components/FightSchedule";

const Fights = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-6xl font-bebas text-center mb-12 text-foreground">
            Fight Schedule
          </h1>
          <FightSchedule />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fights;