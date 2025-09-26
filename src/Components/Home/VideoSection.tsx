import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetabridgeVideo from "../../Assets/metabridge-video.mp4";

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

    // Create the main scroll trigger for pinning with unique ID
    const pinTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: section,
      pinSpacing: true,
      anticipatePin: 1,
      id: `video-pin-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
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
            scrub: 0.5, // Reduced scrub for smoother playback
            anticipatePin: 1,
            id: `video-scrub-${Math.random().toString(36).substr(2, 9)}`,
            onUpdate: (self) => {
              // More precise video time control
              const targetTime = self.progress * video.duration;
              if (Math.abs(video.currentTime - targetTime) > 0.1) {
                video.currentTime = targetTime;
              }
              
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
      if (!video.duration) return;

      // Wait for video to be fully ready for smooth scrubbing
      if (video.readyState < 3) { // HAVE_FUTURE_DATA or higher
        video.addEventListener('canplaythrough', onLoaded, { once: true });
        return;
      }

      // Ensure video is ready for smooth scrubbing
      video.currentTime = 0;
      
      // Load a few frames ahead for smoother scrubbing
      video.addEventListener('seeked', () => {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch(() => {
            // ignore autoplay rejection
          });
        }

        stopTimeout = window.setTimeout(() => {
          video.pause();
          video.currentTime = Math.min(1, video.duration);
          
          // Wait a bit more for the video to be fully ready
          setTimeout(() => {
            createScrubTween();
          }, 200);
        }, 1000);
      }, { once: true });
      
      // Start the process
      video.currentTime = 0.1; // This will trigger 'seeked'
    };

    video.addEventListener("loadedmetadata", onLoaded);
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
            preload="metadata" // Changed from "auto" for better compatibility
            muted
            crossOrigin="anonymous" // Helps with some video loading issues
            style={{ willChange: 'transform' }} // Optimize for animations
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
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black transition-opacity duration-500"
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