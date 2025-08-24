import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play } from "lucide-react";
import fightCard1 from "@/assets/fight-card-1.jpg";
import fightCard2 from "@/assets/fight-card-2.jpg";
import fightCard3 from "@/assets/fight-card-3.jpg";
import fightCard4 from "@/assets/fight-card-4.jpg";

export const WhatsOnSection = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const fightCards = [
    {
      id: 1,
      title: "Championship Showdown",
      date: "Dec 15, 2024",
      time: "9:00 PM EST",
      fighters: "Martinez vs Rodriguez",
      image: fightCard1
    },
    {
      id: 2,
      title: "Ultimate Battle",
      date: "Dec 22, 2024",
      time: "8:00 PM EST",
      fighters: "Johnson vs Thompson",
      image: fightCard2
    },
    {
      id: 3,
      title: "Fight Night Special",
      date: "Dec 29, 2024",
      time: "10:00 PM EST",
      fighters: "Garcia vs Williams",
      image: fightCard3
    },
    {
      id: 4,
      title: "New Year Clash",
      date: "Jan 5, 2025",
      time: "9:30 PM EST",
      fighters: "Davis vs Anderson",
      image: fightCard4
    }
  ];

  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);
    // Simulate opening video player
    setTimeout(() => setSelectedCard(null), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
            What's On This Month
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Don't miss these epic battles and exclusive fight events coming your way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fightCards.map((card) => (
            <div
              key={card.id}
              className={`group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-electric transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCard === card.id ? "ring-2 ring-electric-blue" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="electric" size="icon" className="w-16 h-16 rounded-full">
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bebas text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-electric-blue font-semibold font-inter mb-2">
                  {card.fighters}
                </p>
                <div className="flex items-center text-muted-foreground text-sm font-inter space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{card.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{card.time}</span>
                  </div>
                </div>
              </div>

              {/* Loading state when clicked */}
              {selectedCard === card.id && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-electric-blue font-inter">Loading video...</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};