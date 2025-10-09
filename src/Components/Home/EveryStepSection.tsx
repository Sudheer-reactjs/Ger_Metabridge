import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EveryStepSection = () => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    const heading = headingRef.current;

    // Create timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animate the box to full screen
    tl.to(box, {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
    // Fade out other text elements
    .to(heading.querySelectorAll('span:not(.box-wrapper)'), {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.5)
    // Scale up the text inside the box dramatically
    .to(box.querySelector('.box-content'), {
      scale: 8,
      duration: 1,
      ease: 'power2.inOut'
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-none flex flex-wrap items-center justify-center gap-3"
          >
            <span>The Right Solution For</span>
            <span className="block w-full"></span>
            <span>Every</span>
            
            {/* White Box Between Words */}
            <span className="box-wrapper inline-block">
              <span
                ref={boxRef}
                className="inline-block bg-[#f1f5f8] rounded-lg shadow-2xl overflow-hidden"
              > 
                <div className="w-full h-full flex items-center justify-center p-3">
                  <div className="box-content text-gray-900 text-xs leading-tight text-center">
                    <div className="font-medium mb-1">Choose the Plan That</div>
                    <div className="font-medium text-[10px]">Fits Your Growth</div>
                  </div>
                </div>
              </span>
            </span>
            
            <span>Step</span>
          </h2>
        </div>
      </section>

      {/* Next Section - Demo */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Next Section</h3>
          <p className="text-gray-600 text-lg">Scroll continues here...</p>
        </div>
      </section>
    </>
  );
};

export default EveryStepSection;