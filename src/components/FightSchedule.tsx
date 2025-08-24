import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const FightSchedule = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "ondemand">("upcoming");

  const upcomingEvents = [
    {
      id: 1,
      fighter1: {
        name: "Alex Martinez",
        image: "/api/placeholder/120/120",
        record: "25-3-0"
      },
      fighter2: {
        name: "Carlos Rodriguez", 
        image: "/api/placeholder/120/120",
        record: "22-4-1"
      },
      event: "Championship Bout",
      date: "December 15, 2024",
      time: "9:00 PM EST",
      venue: "Madison Square Garden"
    },
    {
      id: 2,
      fighter1: {
        name: "Mike Johnson",
        image: "/api/placeholder/120/120",
        record: "18-2-0"
      },
      fighter2: {
        name: "David Thompson",
        image: "/api/placeholder/120/120",
        record: "20-1-0"
      },
      event: "Ultimate Battle",
      date: "December 22, 2024", 
      time: "8:00 PM EST",
      venue: "T-Mobile Arena"
    },
    {
      id: 3,
      fighter1: {
        name: "Sarah Garcia",
        image: "/api/placeholder/120/120",
        record: "15-0-0"
      },
      fighter2: {
        name: "Emma Williams",
        image: "/api/placeholder/120/120",
        record: "16-2-0"
      },
      event: "Fight Night Special",
      date: "December 29, 2024",
      time: "10:00 PM EST",
      venue: "UFC Apex"
    }
  ];

  const onDemandFights = [
    {
      id: 1,
      title: "Historic Championship Fight",
      thumbnail: "/api/placeholder/300/200",
      duration: "45 min",
      views: "2.1M"
    },
    {
      id: 2,
      title: "Knockout of the Year",
      thumbnail: "/api/placeholder/300/200", 
      duration: "32 min",
      views: "1.8M"
    },
    {
      id: 3,
      title: "Legendary Comeback",
      thumbnail: "/api/placeholder/300/200",
      duration: "52 min", 
      views: "3.2M"
    },
    {
      id: 4,
      title: "Title Defense Masterclass",
      thumbnail: "/api/placeholder/300/200",
      duration: "38 min",
      views: "1.5M"
    },
    {
      id: 5,
      title: "Rising Star Debut",
      thumbnail: "/api/placeholder/300/200",
      duration: "28 min",
      views: "950K"
    },
    {
      id: 6,
      title: "Ultimate Showdown",
      thumbnail: "/api/placeholder/300/200",
      duration: "41 min",
      views: "2.7M"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-card rounded-lg p-2 inline-flex">
          <Button
            variant={activeTab === "upcoming" ? "electric" : "ghost"}
            onClick={() => setActiveTab("upcoming")}
            className="font-inter"
          >
            Upcoming Events
          </Button>
          <Button
            variant={activeTab === "ondemand" ? "electric" : "ghost"}
            onClick={() => setActiveTab("ondemand")}
            className="font-inter"
          >
            On-Demand Library
          </Button>
        </div>
      </div>

      {/* Upcoming Events */}
      {activeTab === "upcoming" && (
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-electric transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                {/* Fighters */}
                <div className="flex items-center space-x-8">
                  {/* Fighter 1 */}
                  <div className="text-center">
                    <img
                      src={event.fighter1.image}
                      alt={event.fighter1.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                    />
                    <h3 className="font-bebas text-xl text-foreground">
                      {event.fighter1.name}
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm">
                      {event.fighter1.record}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="text-electric-blue font-bebas text-3xl">VS</div>

                  {/* Fighter 2 */}
                  <div className="text-center">
                    <img
                      src={event.fighter2.image}
                      alt={event.fighter2.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                    />
                    <h3 className="font-bebas text-xl text-foreground">
                      {event.fighter2.name}
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm">
                      {event.fighter2.record}
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="text-center lg:text-right space-y-2">
                  <h2 className="font-bebas text-2xl text-foreground">
                    {event.event}
                  </h2>
                  <div className="space-y-1 text-muted-foreground font-inter">
                    <div className="flex items-center justify-center lg:justify-end space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-end space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <p>{event.venue}</p>
                  </div>
                  <Button variant="electric" className="mt-4">
                    Event Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* On-Demand Library */}
      {activeTab === "ondemand" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onDemandFights.map((fight) => (
            <Dialog key={fight.id}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-card hover:shadow-electric transition-all duration-300 transform hover:scale-105">
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={fight.thumbnail}
                      alt={fight.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="electric" size="icon" className="w-16 h-16 rounded-full">
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 bg-background/80 px-2 py-1 rounded text-sm font-inter text-foreground">
                      {fight.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bebas text-xl text-foreground mb-2">
                      {fight.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm font-inter">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{fight.views} views</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl bg-background border-border">
                <div className="aspect-video bg-card rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-electric-blue mx-auto mb-4" />
                    <p className="text-muted-foreground font-inter">
                      Video player would load here
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};