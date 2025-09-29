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

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollRange = container.offsetHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      targetTime = scrollProgress * video.duration;
    };

    const animate = () => {
      if (video && video.duration) {
        let diff = targetTime - video.currentTime;

        // Force minimum change for Chrome to register
        if (Math.abs(diff) < 0.05) {
          diff = diff < 0 ? -0.05 : 0.05;
        }

        video.currentTime = video.currentTime + diff * 0.2;

        // Clamp to video duration
        if (video.currentTime > video.duration) video.currentTime = video.duration;
        if (video.currentTime < 0) video.currentTime = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      handleScroll();
    };

    const unlockVideo = () => {
      video.play().then(() => video.pause()).catch(() => {});
      window.removeEventListener("touchstart", unlockVideo);
    };
    window.addEventListener("touchstart", unlockVideo);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('scroll', handleScroll, { passive: true });

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
      style={{ height: '300vh', willChange: 'transform' }}
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
