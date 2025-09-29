import { useEffect, useRef, useState } from 'react';
import MetabridgeVideo from "../../Assets/metabridge-video-new.mp4";

export default function VideoScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let animationFrameId: number;
    let ticking = false;

    // Update targetTime based on scroll
    const handleScroll = () => {
      if (!video.duration) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollStart = -rect.top;
      const scrollRange = containerHeight - windowHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      targetTime = scrollProgress * video.duration;
      ticking = false;
    };

    // Smooth animation loop
    const animate = () => {
      if (video && video.duration) {
        const diff = targetTime - video.currentTime;
        // Only update if difference is significant
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.2; // slightly faster lerp
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Load video metadata
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      handleScroll(); // set initial frame
    };

    // iOS unlock trick
    const unlockVideo = () => {
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
      window.removeEventListener("touchstart", unlockVideo);
    };
    window.addEventListener("touchstart", unlockVideo);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Use rAF to throttle scroll updates
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);

    // Start animation
    animate();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', unlockVideo);
      cancelAnimationFrame(animationFrameId);
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
