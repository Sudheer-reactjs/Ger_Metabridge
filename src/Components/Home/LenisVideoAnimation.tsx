import React, { useRef, useEffect } from "react";
import MetabridgeVideo from "../../Assets/metabridge-video.mp4";
import Lenis from "@studio-freight/lenis";

const SmoothLenisVideo: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (!video || !wrapper || !text) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => t,
      smooth: true,
    });
    lenisRef.current = lenis;

    const onLoaded = () => {
      const videoDuration = video.duration;
      wrapper.style.height = `${window.innerHeight + videoDuration * 1000}px`;

      const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;
      let currentTime = 0;

      const animate = (time: number) => {
        lenis.raf(time);

        const scrollTop = lenis.scroll;
        const maxScroll = wrapper.scrollHeight - window.innerHeight;
        const fraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

        // Smooth video scrubbing
        const targetTime = videoDuration * fraction;
        currentTime = lerp(currentTime, targetTime, 0.1);
        video.currentTime = Math.min(Math.max(currentTime, 0), videoDuration);

        // Animate text: opacity and translateY
        if (fraction < 0.6) {
          text.style.opacity = `${1 - (fraction / 0.6 - 1)}`; // fade out after 0.6
          text.style.transform = `translateY(${lerp(0, -50, fraction / 0.6)}px)`; // move up slightly
        } else {
          text.style.opacity = "0";
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();

    video.play().catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="video-container relative">
      <video
        ref={videoRef}
        className="sticky top-0 w-full h-screen object-cover"
        src={MetabridgeVideo}
        playsInline
        muted
        preload="auto"
      />

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 1, transition: "opacity 0.3s, transform 0.3s" }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center">
          Your Text Here
        </h1>
      </div>
    </div>
  );
};

export default SmoothLenisVideo;
