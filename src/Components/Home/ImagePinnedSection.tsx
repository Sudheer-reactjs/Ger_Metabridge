import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import LeftImage from "../../Assets/grid-bg2.jpg";
import CenterImage from "../../Assets/grid-bg2.jpg";
import RightImage from "../../Assets/grid-bg2.jpg";
import Logo from "../../Assets/logo.png";

const ImagePinnedSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen width
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // --- Left & Right Image Animations ---
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const leftY = useTransform(scrollYProgress, [0.3, 0.5], [0, -150]);

  const rightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const rightY = useTransform(scrollYProgress, [0.3, 0.5], [0, -150]);

  // --- Center Image Animation ---
  const centerScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 1.4]);
  const centerOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  // --- Logo Animations ---
  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 1]);
  const logoX = useTransform(scrollYProgress, [0.6, 0.8], [0, isMobile ? 0 : 200]);

  // --- Text Animations ---
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.6, 0.8], [isMobile ? 0 : -200, 0]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [isMobile ? 50 : 0, 0]); // for mobile, slide up from below

  return (
    <section ref={ref} className="relative h-[350vh] bg-white">
      {/* Sticky container */}
      <div className="sticky top-0 flex items-center justify-center h-screen overflow-hidden">
        {/* Grid for Images */}
        <div className="grid grid-cols-3 gap-6 w-[80%] items-center">
          {/* Left Image */}
          <motion.img
            src={LeftImage}
            style={{ opacity: leftOpacity, y: leftY }}
            className="w-full h-auto object-cover rounded-2xl"
            alt="Left"
          />

          {/* Center Image */}
          <motion.img
            src={CenterImage}
            style={{ scale: centerScale, opacity: centerOpacity }}
            className="w-full h-auto object-cover rounded-2xl z-10"
            alt="Center"
          />

          {/* Right Image */}
          <motion.img
            src={RightImage}
            style={{ opacity: rightOpacity, y: rightY }}
            className="w-full h-auto object-cover rounded-2xl"
            alt="Right"
          />
        </div>

        {/* Logo */}
        <motion.img
          src={Logo}
          style={{
            opacity: logoOpacity,
            x: logoX,
          }}
          className={`absolute w-32 h-32 md:w-40 md:h-40 object-contain z-20 ${
            isMobile ? "top-[45%]" : ""
          }`}
          alt="Logo"
        />

        {/* Text */}
        <motion.div
          style={{
            opacity: textOpacity,
            x: textX,
            y: textY,
          }}
          className={`absolute z-30 max-w-sm text-center md:text-left ${
            isMobile ? "top-[60%] w-[80%]" : "left-[10%]"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Transform Your Vision
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Experience the power of innovation blending with creativity.
            As the visuals fade, ideas take form.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImagePinnedSection;
