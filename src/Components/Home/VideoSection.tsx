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

    let targetTime = 0; // desired video time
    let animationFrameId: number;

    const handleScroll = () => {
      if (!video.duration) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollStart = -rect.top;
      const scrollRange = containerHeight - windowHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      targetTime = scrollProgress * video.duration;
    };

    const animate = () => {
      if (video && video.duration) {
        // Smoothly interpolate towards targetTime
        video.currentTime += (targetTime - video.currentTime) * 0.1;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

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
    window.addEventListener('scroll', handleScroll);

    // start smooth animation loop
    animate();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
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
