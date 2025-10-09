import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import LeftImage from "../../Assets/grid-bg2.jpg";
import CenterImage from "../../Assets/grid-bg2.jpg";
import RightImage from "../../Assets/grid-bg2.jpg";
import Logo from "../../Assets/logo.png";

const ImagePinnedSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // --- image animations ---
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const centerScale = useTransform(scrollYProgress, [0.4, 0.7, 1], [1, 1.5, 2]);

  // --- logo animations ---
  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7], [0, 1, 1]);
  const logoX = useTransform(scrollYProgress, [0.6, 0.8], [0, 200]); // moves right

  // --- text animations ---
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.6, 0.8], [-200, 0]); // slides in from left

  return (
    <section ref={ref} className="relative h-[350vh] bg-white">
      {/* Sticky container to hold animation */}
      <div className="sticky top-0 flex items-center justify-center h-screen overflow-hidden">
        {/* Images grid */}
        <div className="grid grid-cols-3 gap-6 w-[80%] items-center">
          {/* Left */}
          <motion.img
            src={LeftImage}
            style={{ opacity: leftOpacity }}
            className="w-full h-auto object-cover rounded-2xl"
            alt="Left"
          />
          {/* Center */}
          <motion.img
            src={CenterImage}
            style={{ scale: centerScale }}
            className="w-full h-auto object-cover rounded-2xl z-10"
            alt="Center"
          />
          {/* Right */}
          <motion.img
            src={RightImage}
            style={{ opacity: rightOpacity }}
            className="w-full h-auto object-cover rounded-2xl"
            alt="Right"
          />
        </div>

        {/* Logo (appears, then moves right) */}
        <motion.img
          src={Logo}
          style={{
            opacity: logoOpacity,
            x: logoX,
          }}
          className="absolute w-40 h-40 object-contain z-20"
          alt="Logo"
        />

        {/* Text (appears on left when center scales) */}
        <motion.div
          style={{
            opacity: textOpacity,
            x: textX,
          }}
          className="absolute left-[10%] max-w-sm text-left z-30"
        >
          <h2 className="text-4xl font-bold mb-4">Transform Your Vision</h2>
          <p className="text-lg text-gray-600">
            Discover how innovation meets creativity. Scroll to explore our journey of transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImagePinnedSection;
