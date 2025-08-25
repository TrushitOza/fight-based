import { useState, useRef } from "react";
import { AlertCircle } from "lucide-react";

interface VideoThumbnailProps {
  videoUrl: string;
  thumbnailUrl: string;
  alt: string;
  className?: string;
  onVideoLoad?: () => void;
}

export const VideoThumbnail = ({
  videoUrl,
  thumbnailUrl,
  alt,
  className = "",
  onVideoLoad,
}: VideoThumbnailProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug logging (can be removed in production)
  const debug = false; // Set to true for debugging

  const handleMouseEnter = () => {
    if (debug)
      console.log(
        "VideoThumbnail: Mouse entered, video loaded:",
        isVideoLoaded
      );
    setIsHovered(true);
    const video = videoRef.current;
    if (video && isVideoLoaded) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Handle play promise rejection silently
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
    onVideoLoad?.();
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static Thumbnail - Always visible */}
      <img
        src={thumbnailUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovered && isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onError={() => setThumbnailError(true)}
        onLoad={() => setThumbnailError(false)}
      />

      {/* Thumbnail Error Fallback */}
      {thumbnailError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-white">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm">Image not found</div>
          </div>
        </div>
      )}

      {/* Video Element - Only visible on hover when loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered && isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={handleVideoLoadedData}
        onError={() => setIsVideoLoaded(false)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};
