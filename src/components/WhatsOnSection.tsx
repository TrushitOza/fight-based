import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import fightCard1 from "@/assets/fight-card-1.jpg";
import fightCard2 from "@/assets/fight-card-2.jpg";
import fightCard3 from "@/assets/fight-card-3.jpg";
import fightCard4 from "@/assets/fight-card-4.jpg";

export const WhatsOnSection = () => {
  const fightCards = [
    {
      id: 1,
      title: "Championship Showdown",
      date: "Dec 15, 2024",
      time: "9:00 PM EST",
      fighters: "Martinez vs Rodriguez",
      image: fightCard1,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 2,
      title: "Ultimate Battle",
      date: "Dec 22, 2024",
      time: "8:00 PM EST",
      fighters: "Johnson vs Thompson",
      image: fightCard2,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 3,
      title: "Fight Night Special",
      date: "Dec 29, 2024",
      time: "10:00 PM EST",
      fighters: "Garcia vs Williams",
      image: fightCard3,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 4,
      title: "New Year Clash",
      date: "Jan 5, 2025",
      time: "9:30 PM EST",
      fighters: "Davis vs Anderson",
      image: fightCard4,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas text-foreground mb-4">
            What's On This Month
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Don't miss these epic battles and exclusive fight events coming your
            way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fightCards.map((card) => (
            <Dialog key={card.id}>
              <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-electric transition-all duration-300 transform hover:scale-105">
                {/* Video/Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <VideoThumbnail
                    videoUrl={card.videoUrl}
                    thumbnailUrl={card.image}
                    alt={card.title}
                    className="h-48 group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                  {/* Play button overlay */}
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <Button
                        variant="electric"
                        size="icon"
                        className="w-16 h-16 rounded-full"
                      >
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  </DialogTrigger>
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
              </div>

              {/* Video Player Dialog */}
              <DialogContent className="max-w-6xl bg-background border-border p-0">
                <div className="aspect-video">
                  <VideoPlayer
                    src={card.videoUrl}
                    title={card.title}
                    poster={card.image}
                    className="w-full h-full"
                    qualities={[
                      { label: "1080p", src: card.videoUrl },
                      { label: "720p", src: card.videoUrl },
                      { label: "480p", src: card.videoUrl },
                      { label: "360p", src: card.videoUrl },
                    ]}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};
