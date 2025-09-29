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

    // Light scroll handler: only sets targetTime
    const handleScroll = () => {
      if (!video.duration) return;

      const rect = container.getBoundingClientRect();
      const scrollRange = container.offsetHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollRange));

      targetTime = scrollProgress * video.duration;
    };

    const animate = () => {
      if (video && video.duration) {
        // Smooth lerp for Chrome + Safari
        const diff = targetTime - video.currentTime;
        video.currentTime += diff * 0.25; // higher factor for smoother feeling
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
    window.addEventListener('scroll', handleScroll, { passive: true }); // passive for smooth scroll

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
