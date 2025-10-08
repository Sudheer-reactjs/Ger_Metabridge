import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useAnimation } from "framer-motion";

const isIOS = typeof navigator !== 'undefined' && /iP(hone|ad|od)/.test(navigator.platform) || (typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) && 'ontouchend' in document);

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
      const t = setTimeout(() => {
        if (!isInView) controls.start("hidden");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isInView, controls]);

  // rAF-throttled scroll handler for smoother iOS updates
  useEffect(() => {
    let ticking = false;

    const computeProgress = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      let progress: number;
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
      } else if (rect.top > 0) {
        progress = 0;
      } else {
        progress = 1;
      }

      // clamp and set once per frame
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeProgress);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // initial compute
    requestAnimationFrame(computeProgress);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Easing: slightly softer on iOS
  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const ease = isIOS ? easeOutQuad : easeOutCubic;

  // Mobile-aware max scale to prevent giant bitmap on iPhone
  const maxScale = useMemo(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    return w < 640 ? 4 : 10;
  }, []);

  const eased = ease(scrollProgress);

  // Derived values with gentler thresholds to avoid flicker
  const boxScale = 1 + (eased * maxScale);
  const boxOpacity = scrollProgress < 0.7 ? 1 : Math.max(0, 1 - ((scrollProgress - 0.7) / 0.18)); // slightly longer fade
  const contentOpacity = scrollProgress > 0.62 ? Math.min(1, (scrollProgress - 0.62) / 0.22) : 0; // smoother ramp
  const titleOpacity = scrollProgress < 0.32 ? 1 : Math.max(0, 1 - ((scrollProgress - 0.32) / 0.24));
  const bgWhite = scrollProgress > 0.72;

  // Debounced pointerEvents toggling to avoid rapid flip-flop
  const contentPointerEvents = contentOpacity > 0.05 ? 'auto' : 'none';
  const titlePointerEvents = titleOpacity > 0.05 ? 'auto' : 'none';

  return (
    <div className="">
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
        style={{
          backgroundColor: bgWhite ? '#f1f5f8' : '#0b1016',
          transition: 'background-color 0.3s ease-out',
          // Helps iOS compositing for sticky region
          WebkitTransform: 'translateZ(0)',
          willChange: 'background-color'
        }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
          <div
            className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8 xl:px-14"
            style={{
              opacity: titleOpacity,
              pointerEvents: titlePointerEvents,
              transition: 'opacity 0.25s ease-out',
              willChange: 'opacity, transform'
            }}
          >
            <motion.div
              className="text-center"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 200 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16, duration: 0.9 } }
              }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-white leading-none flex flex-wrap items-center justify-center gap-3">
                <span>The Right Solution For</span>
                <span className="block w-full"></span>
                <span>Every</span>

                {/* White Box Between Words */}
<span
  className="relative inline-block rounded-lg shadow-2xl overflow-hidden bg-[#f1f5f8]"
  style={{
    width: '160px',
    height: '70px',
    opacity: boxOpacity,
    transform: `scale(${boxScale})`,
    transformOrigin: 'center center',
    transition: isIOS
      ? 'transform 0.22s ease-out, opacity 0.22s ease-out'
      : 'transform 0.15s ease-out, opacity 0.15s ease-out',
    willChange: 'transform, opacity',
    WebkitTransform: `translateZ(0) scale(${boxScale})`,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }}
>
  {/* Scaled background only */}
  <div
    className="absolute inset-0 bg-[#f1f5f8]"
    style={{
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    }}
  />

  {/* Text layer (NOT scaled) */}
  <div
    className="absolute inset-0 flex items-center justify-center p-3"
    style={{
      WebkitFontSmoothing: 'antialiased',
      transform: 'none',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      textRendering: 'geometricPrecision',
      zIndex: 1,
    }}
  >
    <svg width="488" height="126" viewBox="0 0 488 126" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2672 33.0001V7.97402H0.739746V2.26632H26.0732V7.97402H16.5457V33.0001H10.2672Z" fill="#051420"/>
<path d="M34.834 33.0001H28.819V0.0710449H34.834V14.033C36.2829 11.7499 38.6538 10.3888 42.1662 10.3888C48.2691 10.3888 51.4303 13.067 51.4303 20.8822V33.0001H45.4152V21.453C45.4152 18.0284 44.4054 15.9648 40.3661 15.9648C36.7659 15.9648 34.834 18.0284 34.834 22.0238V33.0001Z" fill="#051420"/>
<path d="M77.6624 22.9019V23.78H60.8466C61.3296 27.4241 63.4809 28.6974 66.8616 28.6974C69.8472 28.6974 71.9547 27.2485 71.9547 25.5362H77.3989C77.3989 30.3658 73.667 33.6587 66.8177 33.6587C58.5635 33.6587 54.5242 29.6633 54.5242 22.0238C54.5242 14.5598 58.6074 10.3888 66.0274 10.3888C74.3256 10.3888 77.6624 14.5598 77.6624 22.9019ZM61.0661 19.5211H71.7351C71.2522 16.6673 69.1886 15.3501 66.3348 15.3501C63.8322 15.3501 61.8125 16.7551 61.0661 19.5211Z" fill="#051420"/>
<path d="M92.5762 33.0001V2.26632H106.45C116.022 2.26632 119.446 5.64703 119.446 12.2328C119.446 17.7649 116.988 21.0578 110.621 21.9359L119.139 33.0001H111.499L103.113 22.1555H98.8546V33.0001H92.5762ZM98.8546 16.4478H106.362C111.675 16.4478 112.904 15.0428 112.904 12.2328C112.904 9.4229 111.675 7.97402 106.362 7.97402H98.8546V16.4478Z" fill="#051420"/>
<path d="M122.317 4.37378C122.317 1.91507 123.415 0.729628 125.961 0.729628C128.551 0.729628 129.649 1.91507 129.649 4.37378C129.649 6.83248 128.551 8.01793 125.961 8.01793C123.415 8.01793 122.317 6.83248 122.317 4.37378ZM122.976 33.0001V11.0474H128.991V33.0001H122.976Z" fill="#051420"/>
<path d="M155.479 5.60313V10.1693C154.074 9.33509 152.186 8.93994 150.605 8.93994C149.376 8.93994 147.664 9.33509 147.049 10.5644C152.23 11.2669 154.82 13.7695 154.82 18.0723C154.82 23.1653 151.308 25.7557 144.02 25.7557C139.102 25.7557 137.565 25.7996 137.565 26.8094C137.565 27.7754 139.234 28.0388 144.546 28.6096C150.957 29.3121 155.918 29.4877 155.918 35.4588C155.918 40.1128 152.142 42.2202 144.854 42.2202C136.204 42.2202 132.516 39.8054 132.516 34.0977H137.917C137.917 36.4686 140.551 37.2589 145.161 37.2589C148.849 37.2589 150.957 36.776 150.957 35.371C150.957 33.6587 148.542 34.0977 143.844 33.6148C138.751 33.0879 132.604 32.6489 132.604 27.4241C132.604 25.3606 133.658 24.1312 135.238 23.3848C133.746 22.1555 132.999 20.3553 132.999 18.0723C132.999 11.1791 139.41 10.3888 144.854 10.3888C145.249 7.18372 147.356 4.68111 150.913 4.68111C152.625 4.68111 154.293 5.16408 155.479 5.60313ZM139.234 18.0723C139.234 19.9602 141.034 20.7944 144.02 20.7944C147.049 20.7944 148.586 19.9602 148.586 18.0723C148.586 16.1843 146.917 15.3501 143.844 15.3501C140.375 15.3501 139.234 16.1843 139.234 18.0723Z" fill="#051420"/>
<path d="M165.435 33.0001H159.42V0.0710449H165.435V14.033C166.884 11.7499 169.255 10.3888 172.768 10.3888C178.871 10.3888 182.032 13.067 182.032 20.8822V33.0001H176.017V21.453C176.017 18.0284 175.007 15.9648 170.968 15.9648C167.367 15.9648 165.435 18.0284 165.435 22.0238V33.0001Z" fill="#051420"/>
<path d="M188.702 25.0093V16.4478H183.872V11.0474H188.702L191.029 2.26632H194.673V11.0474H205.386V16.4478H194.673V24.3946C194.673 26.4582 195.156 28.0827 197.351 28.0827C199.063 28.0827 200.293 27.2924 200.293 24.6581H205.693C205.693 31.4634 202.532 33.6587 197.088 33.6587C191.468 33.6587 188.702 30.9805 188.702 25.0093Z" fill="#051420"/>
<path d="M231.373 20.7066C224.348 19.4772 219.431 17.5893 219.431 11.1352C219.431 4.32987 223.69 1.60774 233.085 1.60774C241.34 1.60774 246.389 4.32987 246.389 12.0572H240.374C240.374 8.01793 236.73 7.53497 232.559 7.53497C227.773 7.53497 225.973 8.6326 225.973 10.6962C225.973 12.8914 228.344 13.4622 234.139 14.3403C242.042 15.5258 246.74 17.6771 246.74 24.3068C246.74 30.9366 242.437 33.6587 232.778 33.6587C224.436 33.6587 219.255 30.9366 219.255 23.2092H225.27C225.27 27.2924 229.09 27.8193 233.393 27.8193C238.003 27.8193 240.242 26.8973 240.242 24.6142C240.242 21.5408 235.412 21.4091 231.373 20.7066Z" fill="#051420"/>
<path d="M249.355 22.0238C249.355 14.3842 253.35 10.3888 261.736 10.3888C270.122 10.3888 274.161 14.3842 274.161 22.0238C274.161 29.6633 270.122 33.6587 261.736 33.6587C253.35 33.6587 249.355 29.6633 249.355 22.0238ZM255.589 22.0238C255.589 26.0191 257.609 28.0827 261.736 28.0827C265.907 28.0827 267.926 26.0191 267.926 22.0238C267.926 18.0284 265.907 15.9648 261.736 15.9648C257.345 15.9648 255.589 18.0284 255.589 22.0238Z" fill="#051420"/>
<path d="M283.689 33.0001H277.673V0.0710449H283.689V33.0001Z" fill="#051420"/>
<path d="M287.653 11.0474H293.668V22.5945C293.668 26.0191 294.678 28.0827 298.718 28.0827C302.318 28.0827 304.25 26.0191 304.25 22.0238V11.0474H310.265V33.0001H304.25V30.0145C302.801 32.2976 300.43 33.6587 296.917 33.6587C290.815 33.6587 287.653 30.9805 287.653 23.1653V11.0474Z" fill="#051420"/>
<path d="M318.188 25.0093V16.4478H313.359V11.0474H318.188L320.515 2.26632H324.159V11.0474H334.872V16.4478H324.159V24.3946C324.159 26.4582 324.642 28.0827 326.838 28.0827C328.55 28.0827 329.779 27.2924 329.779 24.6581H335.18C335.18 31.4634 332.018 33.6587 326.574 33.6587C320.954 33.6587 318.188 30.9805 318.188 25.0093Z" fill="#051420"/>
<path d="M337.556 4.37378C337.556 1.91507 338.654 0.729628 341.201 0.729628C343.791 0.729628 344.889 1.91507 344.889 4.37378C344.889 6.83248 343.791 8.01793 341.201 8.01793C338.654 8.01793 337.556 6.83248 337.556 4.37378ZM338.215 33.0001V11.0474H344.23V33.0001H338.215Z" fill="#051420"/>
<path d="M347.756 22.0238C347.756 14.3842 351.751 10.3888 360.137 10.3888C368.523 10.3888 372.562 14.3842 372.562 22.0238C372.562 29.6633 368.523 33.6587 360.137 33.6587C351.751 33.6587 347.756 29.6633 347.756 22.0238ZM353.99 22.0238C353.99 26.0191 356.01 28.0827 360.137 28.0827C364.308 28.0827 366.328 26.0191 366.328 22.0238C366.328 18.0284 364.308 15.9648 360.137 15.9648C355.747 15.9648 353.99 18.0284 353.99 22.0238Z" fill="#051420"/>
<path d="M398.686 33.0001H392.671V21.453C392.671 18.0284 391.661 15.9648 387.622 15.9648C384.022 15.9648 382.09 18.0284 382.09 22.0238V33.0001H376.075V11.0474H382.09V14.033C383.539 11.7499 385.91 10.3888 389.422 10.3888C395.525 10.3888 398.686 13.067 398.686 20.8822V33.0001Z" fill="#051420"/>
<path d="M414.063 33.0001V2.26632H438.343V7.97402H420.342V14.7794H436.587V20.4871H420.342V33.0001H414.063Z" fill="#051420"/>
<path d="M439.211 22.0238C439.211 14.3842 443.207 10.3888 451.592 10.3888C459.978 10.3888 464.018 14.3842 464.018 22.0238C464.018 29.6633 459.978 33.6587 451.592 33.6587C443.207 33.6587 439.211 29.6633 439.211 22.0238ZM445.446 22.0238C445.446 26.0191 447.465 28.0827 451.592 28.0827C455.763 28.0827 457.783 26.0191 457.783 22.0238C457.783 18.0284 455.763 15.9648 451.592 15.9648C447.202 15.9648 445.446 18.0284 445.446 22.0238Z" fill="#051420"/>
<path d="M473.545 33.0001H467.53V11.0474H473.545V13.9891C474.906 11.706 477.014 10.3888 479.824 10.3888C484.961 10.3888 487.946 13.3744 487.946 19.9163H482.546C482.546 17.5893 481.097 15.9648 478.419 15.9648C475.345 15.9648 473.545 18.0284 473.545 22.0238V33.0001Z" fill="#051420"/>
<path d="M124.884 115V84.2663H149.471V89.974H131.162V96.7794H147.714V102.487H131.162V109.292H149.91V115H124.884Z" fill="#051420"/>
<path d="M159.589 115L150.237 93.0474H156.823L162.926 107.273L168.985 93.0474H175.571L166.219 115H159.589Z" fill="#051420"/>
<path d="M199.153 104.902V105.78H182.337C182.82 109.424 184.971 110.697 188.352 110.697C191.337 110.697 193.445 109.248 193.445 107.536H198.889C198.889 112.366 195.157 115.659 188.308 115.659C180.054 115.659 176.014 111.663 176.014 104.024C176.014 96.5598 180.098 92.3888 187.518 92.3888C195.816 92.3888 199.153 96.5598 199.153 104.902ZM182.556 101.521H193.225C192.742 98.6673 190.679 97.3501 187.825 97.3501C185.322 97.3501 183.303 98.7551 182.556 101.521Z" fill="#051420"/>
<path d="M208.676 115H202.661V93.0474H208.676V95.9891C210.037 93.706 212.145 92.3888 214.955 92.3888C220.092 92.3888 223.077 95.3744 223.077 101.916H217.677C217.677 99.5893 216.228 97.9648 213.55 97.9648C210.476 97.9648 208.676 100.028 208.676 104.024V115Z" fill="#051420"/>
<path d="M242.051 114.166C239.68 120.927 238.758 125.098 231.953 125.098C226.948 125.098 224.709 121.454 224.709 116.625H229.846C229.846 119.478 230.855 120.137 231.953 120.137C233.578 120.137 234.236 118.381 235.246 115.527L235.553 114.649L224.182 93.0474H230.987L238.275 106.834L243.061 93.0474H249.383L242.051 114.166Z" fill="#051420"/>
<path d="M274.228 102.707C267.203 101.477 262.286 99.5893 262.286 93.1352C262.286 86.3299 266.545 83.6077 275.94 83.6077C284.195 83.6077 289.244 86.3299 289.244 94.0572H283.229C283.229 90.0179 279.585 89.535 275.414 89.535C270.628 89.535 268.828 90.6326 268.828 92.6962C268.828 94.8914 271.199 95.4622 276.994 96.3403C284.897 97.5258 289.595 99.6771 289.595 106.307C289.595 112.937 285.292 115.659 275.633 115.659C267.291 115.659 262.11 112.937 262.11 105.209H268.125C268.125 109.292 271.945 109.819 276.248 109.819C280.858 109.819 283.097 108.897 283.097 106.614C283.097 103.541 278.267 103.409 274.228 102.707Z" fill="#051420"/>
<path d="M296.6 107.009V98.4478H291.77V93.0474H296.6L298.927 84.2663H302.571V93.0474H313.284V98.4478H302.571V106.395C302.571 108.458 303.054 110.083 305.249 110.083C306.962 110.083 308.191 109.292 308.191 106.658H313.591C313.591 113.463 310.43 115.659 304.986 115.659C299.366 115.659 296.6 112.98 296.6 107.009Z" fill="#051420"/>
<path d="M338.887 104.902V105.78H322.071C322.554 109.424 324.705 110.697 328.086 110.697C331.072 110.697 333.179 109.248 333.179 107.536H338.623C338.623 112.366 334.891 115.659 328.042 115.659C319.788 115.659 315.749 111.663 315.749 104.024C315.749 96.5598 319.832 92.3888 327.252 92.3888C335.55 92.3888 338.887 96.5598 338.887 104.902ZM322.29 101.521H332.96C332.477 98.6673 330.413 97.3501 327.559 97.3501C325.057 97.3501 323.037 98.7551 322.29 101.521Z" fill="#051420"/>
<path d="M348.41 123.781H342.395V93.0474H348.41V96.033C349.552 93.706 351.659 92.3888 355.172 92.3888C361.099 92.3888 365.007 96.3842 365.007 104.024C365.007 111.663 360.528 115.659 355.04 115.659C351.572 115.659 349.552 114.166 348.41 111.883V123.781ZM358.772 104.024C358.772 100.028 357.323 97.9648 353.635 97.9648C350.211 97.9648 348.41 100.028 348.41 104.024C348.41 107.975 350.211 110.083 353.635 110.083C356.84 110.083 358.772 107.975 358.772 104.024Z" fill="#051420"/>
</svg>

  </div>
</span>



                <span>Step</span>
              </h2>
            </motion.div>
          </div>

          {/* Full Screen Content */}
          <div
            className="absolute pt-[90px] inset-0 z-30 bg-[#f1f5f8] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-14 overflow-y-auto rounded-[21.95px]"
            style={{
              opacity: contentOpacity,
              pointerEvents: contentPointerEvents,
              transition: 'opacity 0.25s ease-out',
              willChange: 'opacity',
              WebkitTransform: 'translateZ(0)'
            }}
          >
            <div className="w-full max-w-[968px]">
              <h2 className="text-center text-3xl md:text-5xl lg:text-6xl text-[#0B1013] max-w-2xl m-auto leading-normal flex flex-wrap items-center justify-center gap-3">
                Upgrade Your Limits, Not Your Budget
              </h2>  

              <p className="text-center text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mt-4 mb-4 md:mb-9">
                Not everyone has the same goals. That's why we give you access to different account levels.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr_0.95fr] gap-2 md:gap-6">
                <div className="bg-white rounded-[20px] p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Standard</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Affordable Foundation For Individuals And Small Teams.
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Ideal for testing and early campaigns
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Simple setup with essential features
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[20px] p-4 md:p-12 shadow-md hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Premium</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Enhanced performance with advanced reliability and reach.
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Higher limits for scaling operations
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Priority support for smoother workflows
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[20px] p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Elite</h3>
                  <p className="text-[#0B1013] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Exclusive access, unmatched trust, and priority service.
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Whitelisted for maximum deliverability
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#454B50] text-xs md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">
                        Dedicated support and fast-track features
                      </p>
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