"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function PinnedScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Detect iOS for smoother easing
  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      setTimeout(() => {
        if (!isInView) controls.start("hidden");
      }, 300);
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoother easing
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const boxScale = 1 + easeOutCubic(scrollProgress) * 10;
  const boxOpacity =
    scrollProgress < 0.7
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.7) / 0.15);
  const contentOpacity =
    scrollProgress > 0.6
      ? Math.min(1, (scrollProgress - 0.6) / 0.2)
      : 0;
  const titleOpacity =
    scrollProgress < 0.3
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.3) / 0.2);
  const bgWhite = scrollProgress > 0.7;

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
      style={{
        backgroundColor: bgWhite ? "#f1f5f8" : "#0b1016",
        transition: "background-color 0.3s ease-out",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Title Section */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8 xl:px-14"
          style={{
            opacity: titleOpacity,
            pointerEvents: titleOpacity > 0 ? "auto" : "none",
            transition: "opacity 0.2s ease-out",
          }}
        >
          <motion.div
            className="text-center"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "tween", ease: "easeOut", duration: 0.6 },
              },
            }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white leading-none flex flex-wrap items-center justify-center gap-3">
              <span>The Right Solution For</span>
              <span className="block w-full"></span>
              <span>Every</span>

              {/* ✅ Optimized Scalable Box for Safari */}
              <span
                className="inline-block bg-[#f1f5f8] rounded-lg shadow-2xl overflow-hidden"
                style={{
                  width: "160px",
                  height: "70px",
                  transform: `scale3d(${boxScale}, ${boxScale}, 1)`,
                  transformOrigin: "center center",
                  transition: isIOS
                    ? "transform 0.22s ease-out, opacity 0.22s ease-out"
                    : "transform 0.15s ease-out, opacity 0.15s ease-out",
                  opacity: boxOpacity,
                  WebkitFontSmoothing: "antialiased",
                  transformStyle: "flat",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center p-3">
                  {/* Separate layer for text (no blur in Safari) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: "translateZ(0)",
                      WebkitFontSmoothing: "antialiased",
                      transformStyle: "flat",
                    }}
                  >
                    <div className="text-gray-900 text-xs leading-tight text-center">
                      <div className="glancyr-medium mb-1">
                        Choose the Plan That
                      </div>
                      <div className="glancyr-medium text-[10px]">
                        Fits Your Growth
                      </div>
                    </div>
                  </div>
                </div>
              </span>

              <span>Step</span>
            </h2>
          </motion.div>
        </div>

        {/* Content Section */}
        <div
          className="absolute pt-[90px] inset-0 z-30 bg-[#f1f5f8] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-14 overflow-y-auto rounded-[21.95px]"
          style={{
            opacity: contentOpacity,
            pointerEvents: contentOpacity > 0 ? "auto" : "none",
            transition: "opacity 0.2s ease-out",
          }}
        >
          <div className="w-full max-w-[968px]">
            <h2 className="text-center text-xl md:text-4xl lg:text-6xl text-[#0B1013] max-w-2xl m-auto leading-normal">
              Upgrade Your Limits, Not Your Budget
            </h2>
            <p className="text-center text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mt-4 mb-4 md:mb-9">
              Not everyone has the same goals. That's why we give you access to
              different account levels.
            </p>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr_0.95fr] gap-2 md:gap-6">
              {["Standard", "Premium", "Elite"].map((plan) => (
                <div
                  key={plan}
                  className="bg-white rounded-[20px] p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl md:text-2xl text-[#051420] mb-3">
                    {plan}
                  </h3>
                  <p className="text-[#0B1013] text-xs md:text-lg leading-[24px] md:leading-[30px] mb-2">
                    {plan === "Standard" &&
                      "Affordable Foundation For Individuals And Small Teams."}
                    {plan === "Premium" &&
                      "Enhanced performance with advanced reliability and reach."}
                    {plan === "Elite" &&
                      "Exclusive access, unmatched trust, and priority service."}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg leading-[24px] md:leading-[30px]">
                        {plan === "Standard" &&
                          "Ideal for testing and early campaigns"}
                        {plan === "Premium" &&
                          "Higher limits for scaling operations"}
                        {plan === "Elite" &&
                          "Whitelisted for maximum deliverability"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg leading-[24px] md:leading-[30px]">
                        {plan === "Standard" &&
                          "Simple setup with essential features"}
                        {plan === "Premium" &&
                          "Priority support for smoother workflows"}
                        {plan === "Elite" &&
                          "Dedicated support and fast-track features"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
