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
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current || !sectionRef.current || !videoRef.current) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const scrollDistance = window.innerHeight * 3;
    gsap.set(wrapper, { height: scrollDistance });

    const handleScroll = () => {
      if (!wrapper || !section) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if we should pin the section
      const shouldPin = wrapperRect.top <= 0 && wrapperRect.bottom > windowHeight;
      setIsPinned(shouldPin);

      // Calculate scroll progress through the pinned section
      let progress = 0;
      if (wrapperRect.top <= 0) {
        const scrolledDistance = -wrapperRect.top;
        const totalScrollDistance = wrapperHeight - windowHeight;
        progress = Math.max(0, Math.min(0.998, scrolledDistance / totalScrollDistance));
      }

      setScrollProgress(progress);
    };

    // Initial scroll trigger setup for pinning
    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: section,
      anticipatePin: 1,
      onRefresh: () => {
        gsap.set(wrapper, { height: scrollDistance });
      }
    });

    // Add scroll event listener for video scrubbing
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      gsap.set(wrapper, { height: window.innerHeight * 3 });
      scrollTrigger.refresh();
      handleScroll();
    });

    // Initial call
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      scrollTrigger.kill();
    };
  }, []);

  // Handle video scrubbing based on scroll progress
 useEffect(() => {
  if (!videoRef.current) return;

  const video = videoRef.current;

  const onLoaded = () => {
    if (!video.duration) return;

    gsap.to(video, {
      currentTime: video.duration, // animate from 0 to full duration
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth scrubbing
        anticipatePin: 1,
      },
    });
  };

  // Wait for metadata so duration is available
  video.addEventListener("loadedmetadata", onLoaded);

  return () => {
    video.removeEventListener("loadedmetadata", onLoaded);
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);



  return (
    <div className="relative">
      {/* Video Scroll Container */}
      <div ref={wrapperRef} className="relative">
        <section
          ref={sectionRef}
          className={`w-full h-screen overflow-hidden transition-all duration-300 ${
            isPinned ? 'fixed top-0 left-0' : 'absolute top-0 left-0'
          }`}
          style={{ zIndex: 10 }}
        >
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={MetabridgeVideo}
            playsInline
            preload="auto"
            muted
          />
          
          {/* Video Content Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: scrollProgress < 0.8 ? 1 : 1 - ((scrollProgress - 0.8) / 0.2)
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