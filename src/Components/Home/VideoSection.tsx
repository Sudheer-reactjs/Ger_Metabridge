import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetabridgeVideo from "../../Assets/MicrosoftTeams-videoundefined.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoScrollSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current || !videoRef.current) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const scrollDistance = window.innerHeight * 3;
    
    // Set wrapper height
    gsap.set(wrapper, { height: scrollDistance });

    // Create the main scroll trigger for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: section,
      pinSpacing: true, // This ensures proper spacing
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
      onRefresh: () => {
        gsap.set(wrapper, { height: scrollDistance });
      }
    });

    // Handle resize
    const handleResize = () => {
      const newScrollDistance = window.innerHeight * 3;
      gsap.set(wrapper, { height: newScrollDistance });
      
      // Update the pin trigger
      pinTrigger.vars.end = `+=${newScrollDistance}`;
      pinTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      pinTrigger.kill();
    };
  }, []);

  // Handle video scrubbing based on scroll progress
  useEffect(() => {
    if (!videoRef.current || !wrapperRef.current) return;

    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const scrollDistance = window.innerHeight * 3;

    let stopTimeout: number | null = null;
    let scrubTween: gsap.core.Tween | null = null;

    const createScrubTween = () => {
      scrubTween = gsap.fromTo(
        video,
        { currentTime: video.currentTime },
        {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            // Add smoothing to reduce jerkiness
            onUpdate: (self) => {
              // Ensure video doesn't jump at the end
              if (self.progress >= 0.99) {
                video.currentTime = video.duration;
              }
            }
          },
        }
      );
      ScrollTrigger.refresh();
    };

const onLoaded = () => {
  if (!video.duration || video.duration === Infinity) {
    console.log("Video duration not ready:", video.duration);
    return;
  }
  
  console.log("Video loaded. Duration:", video.duration);
  video.currentTime = 0;
  
  const playPromise = video.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise.catch(() => {
      // ignore autoplay rejection
    });
  }
  
  stopTimeout = window.setTimeout(() => {
    video.pause();
    video.currentTime = Math.min(1, video.duration);
    createScrubTween();
  }, 1000);
};

video.addEventListener("loadedmetadata", onLoaded);
video.addEventListener("loadeddata", onLoaded); // Add this line
if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      if (stopTimeout) {
        window.clearTimeout(stopTimeout);
        stopTimeout = null;
      }
      if (scrubTween) {
        scrubTween.kill();
        scrubTween = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Video Scroll Container */}
      <div ref={wrapperRef} className="relative">
        <section
          ref={sectionRef}
          className="w-full h-screen overflow-hidden"
          style={{ zIndex: 10 }}
        >
    <video
  ref={videoRef}
  className="absolute top-0 left-0 w-full h-full object-cover"
  src={MetabridgeVideo}
  playsInline
  preload="metadata"
  muted
  crossOrigin="anonymous"
/> 
          
          {/* Video Content Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: scrollProgress < 0.6 ? 1 : 1 - ((scrollProgress - 0.6) / 0.4)
            }}
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center">
              Your Text Here
            </h1>
          </div>

          {/* Fade to Next Section Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1016] to-[#0b1016] transition-opacity duration-500"
            style={{
              opacity: scrollProgress > 0.7 ? (scrollProgress - 0.7) / 0.3 : 0
            }}
          />
          
        </section>
      </div>
    </div>
  );
};

export default VideoScrollSection;