import { useEffect, useRef, useState } from 'react';
import MetabridgeVideo from "../Assets/metabridge-video-new.mp4"

export default function VideoScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let lastUpdate = 0;

    const handleScroll = () => {
      if (!video.duration) return;

      const now = performance.now();
      // throttle updates → only run every 100ms (~10fps)
      if (now - lastUpdate < 100) return;
      lastUpdate = now;

      window.requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollStart = -rect.top;
        const scrollRange = containerHeight - windowHeight;
        const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollRange));

        const targetTime = scrollProgress * video.duration;
        video.currentTime = targetTime;
      });
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      handleScroll(); // initial frame
    };

    // iOS unlock trick: must play/pause once after a tap
    const unlockVideo = () => {
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
      window.removeEventListener("touchstart", unlockVideo);
    };
    window.addEventListener("touchstart", unlockVideo);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('scroll', handleScroll);

    // initial call
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
