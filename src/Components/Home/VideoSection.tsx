import { useEffect, useRef, useState } from 'react';
import MetabridgeVideo from "../../Assets/metabridge-video-new.mp4"

export default function VideoScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!video.duration) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const containerHeight = container.offsetHeight;
          const windowHeight = window.innerHeight;

          // Calculate scroll progress
          const scrollStart = -rect.top;
          const scrollRange = containerHeight - windowHeight;
          const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

          // Update video time
          const targetTime = scrollProgress * video.duration;
          video.currentTime = targetTime;

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      handleScroll(); // Set initial frame
    };

    // iOS unlock trick: requires a tap once to allow seeking
    const unlockVideo = () => {
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
      window.removeEventListener("touchstart", unlockVideo);
    };
    window.addEventListener("touchstart", unlockVideo);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('scroll', handleScroll);

    // Initial call
    handleScroll();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', unlockVideo);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
          src={MetabridgeVideo}
        />

        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-xl">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
}
