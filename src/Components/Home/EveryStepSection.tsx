import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from "framer-motion";

export default function PinnedScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Framer motion animation for title
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      setTimeout(() => {
        if (!isInView) controls.start("hidden");
      }, 300);
    }
  }, [isInView, controls]);

  // Scroll progress handler with requestAnimationFrame for smooth mobile performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current!;
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

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoother easing function
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  // Adjusted scale and opacity
  const boxScale = 1 + easeOutCubic(scrollProgress) * 4; // smaller, smooth scale
  const boxOpacity = scrollProgress < 0.7 ? 1 : Math.max(0, 1 - ((scrollProgress - 0.7) / 0.15));
  const contentOpacity = scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) / 0.2) : 0;
  const titleOpacity = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - ((scrollProgress - 0.3) / 0.2));
  const bgWhite = scrollProgress > 0.7;

  return (
    <div>
      {/* Pinned Scroll Section */}
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
        style={{
          backgroundColor: bgWhite ? '#f1f5f8' : '#0b1016',
          transition: 'background-color 0.3s ease-out'
        }}
      >
        <div 
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >

          {/* Main Title with Box */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8 xl:px-14"
            style={{
              opacity: titleOpacity,
              pointerEvents: titleOpacity > 0 ? 'auto' : 'none',
              transition: 'opacity 0.2s ease-out'
            }}
          >
            <motion.div 
              className="text-center"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 200 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14, duration: 0.8 } }
              }}
            > 
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-white leading-none flex flex-wrap items-center justify-center gap-3">
                <span>The Right Solution For</span>
                <span className="block w-full"></span>
                <span>Every</span>

                {/* White Box Between Words */}
                <span
                  className="inline-block bg-[#f1f5f8] rounded-lg shadow-2xl overflow-hidden"
                  style={{
                    width: '160px', 
                    height: '70px',
                    transform: `scale(${boxScale}) translateZ(0)`,
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                    opacity: boxOpacity
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-3">
                    <div className="text-gray-900 text-xs leading-tight text-center">
                      <div className="glancyr-medium mb-1">Choose the Plan That </div>
                      <div className="glancyr-medium text-[10px]">Fits Your Growth</div>
                    </div>
                  </div>
                </span>

                <span>Step</span>
              </h2>
            </motion.div> 
          </div>

          {/* Full Screen Content - Appears after box fills screen */}
          <div
            className="absolute pt-[90px] inset-0 z-30 bg-[#f1f5f8] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-14 overflow-y-auto rounded-[21.95px]"
            style={{
              opacity: contentOpacity,
              pointerEvents: contentOpacity > 0 ? 'auto' : 'none',
              transition: 'opacity 0.2s ease-out'
            }}
          >
            <div className="w-full max-w-[968px]">
              <h2 className="text-center text-xl md:text-4xl lg:text-6xl text-[#0B1013] max-w-2xl m-auto leading-normal flex flex-wrap items-center justify-center gap-3">
                Upgrade Your Limits, Not Your Budget
              </h2>

              <p className="text-center text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mt-4 mb-4 md:mb-9">
                Not everyone has the same goals. That's why we give you access to different account levels.
              </p>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr_0.95fr] gap-2 md:gap-6">
                {/* Cards here (Standard, Premium, Elite) */}
                {/* Keep your existing card markup unchanged */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
