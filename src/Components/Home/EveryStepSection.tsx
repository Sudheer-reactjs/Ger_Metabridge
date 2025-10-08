import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from "framer-motion";

export default function PinnedScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();


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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animations
  const boxScale = 1 + (scrollProgress * 25);
  const boxOpacity = scrollProgress < 0.7 ? 1 : 1 - ((scrollProgress - 0.7) / 0.15);
  const contentOpacity = scrollProgress > 0.6 ? (scrollProgress - 0.6) / 0.2 : 0;
  const titleOpacity = scrollProgress < 0.3 ? 1 : 1 - ((scrollProgress - 0.3) / 0.2);
  const bgWhite = scrollProgress > 0.7;

  return (
    <div className="">

      {/* Pinned Scroll Section */}
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
        style={{
          backgroundColor: bgWhite ? '#f1f5f8' : '#0b1016',
          transition: 'background-color 0.2s ease-out'
        }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

          {/* Main Title with Box */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10  px-4 sm:px-6 lg:px-8 xl:px-14"
            style={{
              opacity: titleOpacity,
              pointerEvents: titleOpacity > 0 ? 'auto' : 'none'
            }}
          >
            <motion.div className="text-center"
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
                    transform: `scale(${boxScale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.1s ease-out',
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
              pointerEvents: contentOpacity > 0 ? 'auto' : 'none'
            }}

            
          >
            <div className="w-full max-w-[968px]">
               <h2 className="text-center text-xl md:text-4xl lg:text-6xl text-[#0B1013] max-w-2xl m-auto leading-normal flex flex-wrap items-center justify-center gap-3">Upgrade Your Limits, Not Your Budget</h2>
              {/* Info Bar */}
              <p className="text-center text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mt-4 mb-4 md:mb-9">Not everyone has the same goals. That's why we give you access to different account levels.</p>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr_0.95fr] gap-2 md:gap-6">
                {/* Standard Card */}
                <div className="bg-white rounded-[20px] p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Standard</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Affordable Foundation For Individuals And Small Teams.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Ideal for testing and early campaigns</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Simple setup with essential features</p>
                    </div>
                  </div>
                </div>

                {/* Premium Card */}
                <div className="bg-white rounded-[20px] p-4 md:p-12">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Premium</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Enhanced performance with advanced reliability and reach.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Higher limits for scaling operations</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Priority support for smoother workflows</p>
                    </div>
                  </div>
                </div>

                {/* Elite Card */}
                <div className="bg-white rounded-[20px] p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Elite</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Exclusive access, unmatched trust, and priority service.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Whitelisted for maximum deliverability</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]  ">Dedicated support and fast-track features</p>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}