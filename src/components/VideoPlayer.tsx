import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  className?: string;
  qualities?: { label: string; src: string }[];
}

export const VideoPlayer = ({
  src,
  title,
  poster,
  className = "",
  qualities,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState(
    qualities?.[0] || { label: "Auto", src }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!isFullscreen) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(
      0,
      Math.min(duration, video.currentTime + seconds)
    );
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const changeQuality = (quality: { label: string; src: string }) => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    setCurrentQuality(quality);
    video.src = quality.src;

    video.addEventListener(
      "loadedmetadata",
      () => {
        video.currentTime = currentTime;
        if (wasPlaying) {
          video.play();
        }
      },
      { once: true }
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={currentQuality.src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Play/Pause Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 text-white text-sm">
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => skip(-10)}
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => skip(10)}
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Settings Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                {isFullscreen ? (
                  <DropdownMenuPortal>
                    <DropdownMenuContent
                      className="bg-popover border-border z-[9999] max-h-80 overflow-y-auto"
                      side="top"
                      align="end"
                      sideOffset={5}
                    >
                      {/* Quality Options */}
                      {qualities && qualities.length > 0 && (
                        <>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                            Quality
                          </div>
                          {qualities.map((quality) => (
                            <DropdownMenuItem
                              key={quality.label}
                              onClick={() => changeQuality(quality)}
                            >
                              {quality.label}{" "}
                              {currentQuality.label === quality.label && "✓"}
                            </DropdownMenuItem>
                          ))}
                          <div className="h-px bg-border my-1"></div>
                        </>
                      )}

                      {/* Playback Speed Options */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                        Speed
                      </div>
                      <DropdownMenuItem onClick={() => changePlaybackRate(0.5)}>
                        0.5x {playbackRate === 0.5 && "✓"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changePlaybackRate(0.75)}
                      >
                        0.75x {playbackRate === 0.75 && "✓"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(1)}>
                        1x {playbackRate === 1 && "✓"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changePlaybackRate(1.25)}
                      >
                        1.25x {playbackRate === 1.25 && "✓"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(1.5)}>
                        1.5x {playbackRate === 1.5 && "✓"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(2)}>
                        2x {playbackRate === 2 && "✓"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                ) : (
                  <DropdownMenuContent
                    className="bg-popover border-border"
                    side="top"
                    align="end"
                    sideOffset={5}
                  >
                    {/* Quality Options */}
                    {qualities && qualities.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                          Quality
                        </div>
                        {qualities.map((quality) => (
                          <DropdownMenuItem
                            key={quality.label}
                            onClick={() => changeQuality(quality)}
                          >
                            {quality.label}{" "}
                            {currentQuality.label === quality.label && "✓"}
                          </DropdownMenuItem>
                        ))}
                        <div className="h-px bg-border my-1"></div>
                      </>
                    )}

                    {/* Playback Speed Options */}
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                      Speed
                    </div>
                    <DropdownMenuItem onClick={() => changePlaybackRate(0.5)}>
                      0.5x {playbackRate === 0.5 && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(0.75)}>
                      0.75x {playbackRate === 0.75 && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1)}>
                      1x {playbackRate === 1 && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1.25)}>
                      1.25x {playbackRate === 1.25 && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1.5)}>
                      1.5x {playbackRate === 1.5 && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(2)}>
                      2x {playbackRate === 2 && "✓"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white font-bebas text-xl">{title}</h3>
        </div>
      </div>
    </div>
  );
};
