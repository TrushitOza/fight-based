import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Play,
  Eye,
  MapPin,
  Users,
  Trophy,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoThumbnail } from "@/components/VideoThumbnail";
import { Badge } from "@/components/ui/badge";

export const FightSchedule = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "ondemand">(
    "upcoming"
  );

  const upcomingEvents = [
    {
      id: 1,
      fighter1: {
        name: "Alex Martinez",
        image: "/api/placeholder/120/120",
        record: "25-3-0",
        age: 28,
        weight: "185 lbs",
        reach: "74 in",
        country: "USA",
      },
      fighter2: {
        name: "Carlos Rodriguez",
        image: "/api/placeholder/120/120",
        record: "22-4-1",
        age: 31,
        weight: "184 lbs",
        reach: "72 in",
        country: "Mexico",
      },
      event: "Championship Bout",
      date: "December 15, 2024",
      time: "9:00 PM EST",
      venue: "Madison Square Garden",
      location: "New York, NY",
      ticketPrice: "$89 - $599",
      capacity: "20,789",
      title: "WBC Middleweight Championship",
      description:
        "The highly anticipated championship bout between undefeated Alex Martinez and veteran Carlos Rodriguez promises to be an explosive encounter.",
      undercard: [
        "Sarah Johnson vs Emma Davis - Women's Bantamweight",
        "Mike Thompson vs Jake Wilson - Light Heavyweight",
        "Tony Garcia vs Luis Morales - Welterweight",
      ],
    },
    {
      id: 2,
      fighter1: {
        name: "Mike Johnson",
        image: "/api/placeholder/120/120",
        record: "18-2-0",
      },
      fighter2: {
        name: "David Thompson",
        image: "/api/placeholder/120/120",
        record: "20-1-0",
      },
      event: "Ultimate Battle",
      date: "December 22, 2024",
      time: "8:00 PM EST",
      venue: "T-Mobile Arena",
    },
    {
      id: 3,
      fighter1: {
        name: "Sarah Garcia",
        image: "/api/placeholder/120/120",
        record: "15-0-0",
      },
      fighter2: {
        name: "Emma Williams",
        image: "/api/placeholder/120/120",
        record: "16-2-0",
      },
      event: "Fight Night Special",
      date: "December 29, 2024",
      time: "10:00 PM EST",
      venue: "UFC Apex",
    },
  ];

  const onDemandFights = [
    {
      id: 1,
      title: "Historic Championship Fight",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight1",
      duration: "45 min",
      views: "2.1M",
    },
    {
      id: 2,
      title: "Knockout of the Year",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight2",
      duration: "32 min",
      views: "1.8M",
    },
    {
      id: 3,
      title: "Legendary Comeback",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight3",
      duration: "52 min",
      views: "3.2M",
    },
    {
      id: 4,
      title: "Title Defense Masterclass",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight4",
      duration: "38 min",
      views: "1.5M",
    },
    {
      id: 5,
      title: "Rising Star Debut",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight5",
      duration: "28 min",
      views: "950K",
    },
    {
      id: 6,
      title: "Ultimate Showdown",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "https://picsum.photos/300/200?random=fight6",
      duration: "41 min",
      views: "2.7M",
    },
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
                  <div className="text-electric-blue font-bebas text-3xl">
                    VS
                  </div>

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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="electric" className="mt-4">
                        Event Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-background border-border max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bebas text-foreground">
                          {event.title || event.event}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Event Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Calendar className="w-5 h-5" />
                              <span className="font-inter">
                                {event.date} at {event.time}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <MapPin className="w-5 h-5" />
                              <span className="font-inter">
                                {event.venue}, {event.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Users className="w-5 h-5" />
                              <span className="font-inter">
                                Capacity: {event.capacity}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <DollarSign className="w-5 h-5" />
                              <span className="font-inter">
                                Tickets: {event.ticketPrice}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Badge variant="outline" className="w-fit">
                              <Trophy className="w-4 h-4 mr-1" />
                              {event.title}
                            </Badge>
                            <p className="text-muted-foreground font-inter">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        {/* Fighters Comparison */}
                        <div className="bg-card rounded-lg p-6">
                          <h3 className="text-xl font-bebas text-foreground mb-4">
                            Fighter Comparison
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            {/* Fighter 1 */}
                            <div className="text-center space-y-3">
                              <img
                                src={event.fighter1.image}
                                alt={event.fighter1.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                              />
                              <div>
                                <h4 className="font-bebas text-lg text-foreground">
                                  {event.fighter1.name}
                                </h4>
                                <p className="text-electric-blue font-inter text-sm">
                                  {event.fighter1.country}
                                </p>
                              </div>
                              <div className="space-y-1 text-sm font-inter text-muted-foreground">
                                <p>Record: {event.fighter1.record}</p>
                                <p>Age: {event.fighter1.age}</p>
                                <p>Weight: {event.fighter1.weight}</p>
                                <p>Reach: {event.fighter1.reach}</p>
                              </div>
                            </div>

                            {/* VS */}
                            <div className="text-center">
                              <div className="text-electric-blue font-bebas text-4xl">
                                VS
                              </div>
                            </div>

                            {/* Fighter 2 */}
                            <div className="text-center space-y-3">
                              <img
                                src={event.fighter2.image}
                                alt={event.fighter2.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                              />
                              <div>
                                <h4 className="font-bebas text-lg text-foreground">
                                  {event.fighter2.name}
                                </h4>
                                <p className="text-electric-blue font-inter text-sm">
                                  {event.fighter2.country}
                                </p>
                              </div>
                              <div className="space-y-1 text-sm font-inter text-muted-foreground">
                                <p>Record: {event.fighter2.record}</p>
                                <p>Age: {event.fighter2.age}</p>
                                <p>Weight: {event.fighter2.weight}</p>
                                <p>Reach: {event.fighter2.reach}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Undercard */}
                        {event.undercard && (
                          <div className="bg-card rounded-lg p-6">
                            <h3 className="text-xl font-bebas text-foreground mb-4">
                              Undercard Fights
                            </h3>
                            <div className="space-y-2">
                              {event.undercard.map((fight, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 text-muted-foreground font-inter"
                                >
                                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                                  <span>{fight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
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
              <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-electric transition-all duration-300 transform hover:scale-105">
                {/* Video Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <VideoThumbnail
                    videoUrl={fight.videoUrl}
                    thumbnailUrl={fight.thumbnail}
                    alt={fight.title}
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

              <DialogContent className="max-w-6xl bg-background border-border p-0">
                <div className="aspect-video">
                  <VideoPlayer
                    src={fight.videoUrl}
                    title={fight.title}
                    poster={fight.thumbnail}
                    className="w-full h-full"
                    qualities={[
                      { label: "1080p", src: fight.videoUrl },
                      { label: "720p", src: fight.videoUrl },
                      { label: "480p", src: fight.videoUrl },
                      { label: "360p", src: fight.videoUrl },
                    ]}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};
