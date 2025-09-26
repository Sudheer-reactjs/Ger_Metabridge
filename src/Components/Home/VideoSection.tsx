import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetabridgeVideo from "../../Assets/output-1.mp4";

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
  if (!videoRef.current || !wrapperRef.current) return;

  const video = videoRef.current;
  const wrapper = wrapperRef.current;
  const scrollDistance = window.innerHeight * 3;

  let stopTimeout: number | null = null;
  let scrubTween: gsap.core.Tween | null = null;

  const createScrubTween = () => {
    // create tween that *starts* from currentTime (which we set to 1)
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
        },
      }
    );
    // make sure ScrollTrigger calculations are up to date
    ScrollTrigger.refresh();
  };

  const onLoaded = () => {
    if (!video.duration) return;

    // 1) reset to start and play (muted should allow autoplay)
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // ignore autoplay rejection (browser policies)
      });
    }

    // 2) stop after 1 second, pause at exactly 1s, then create scrub tween
    stopTimeout = window.setTimeout(() => {
      video.pause();
      video.currentTime = Math.min(1, video.duration); // ensure we don't exceed duration
      createScrubTween();
    }, 1000);
  };

  video.addEventListener("loadedmetadata", onLoaded);
  // If metadata already loaded, run immediately
  if (video.readyState >= 1) onLoaded();

  return () => {
    video.removeEventListener("loadedmetadata", onLoaded);
    if (stopTimeout) {
      window.clearTimeout(stopTimeout);
      stopTimeout = null;
    }
    if (scrubTween) {
      // kill only this tween (and its ScrollTrigger)
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