import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef } from "react";
import GridImage1 from "../../Assets/grid-bg1.jpg";
import GridImage2 from "../../Assets/grid-bg2.jpg";
import ContactButton from "../ContactButton";

const MetaBridgeGridSection = () => {
  // Refs for each motion block
  const headingRef = useRef(null);
  const grid1Ref = useRef(null);
  const grid2Ref = useRef(null);
  const buttonRef = useRef(null);

  // Detect if each element is in view
  const headingInView = useInView(headingRef, { once: false, amount: 0.3 });
  const grid1InView = useInView(grid1Ref, { once: false, amount: 0.3 });
  const grid2InView = useInView(grid2Ref, { once: false, amount: 0.3 });
  const buttonInView = useInView(buttonRef, { once: false, amount: 0.3 });

  // Animation variants
  const transition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 14,
    duration: 0.8,
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition },
  };

  const gridVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 150 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...transition, delay },
    },
  });

  return (
    <section className="w-full py-10 md:py-24 bg-[#f1f5f8] rounded-b-[21px] overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="self-stretch flex flex-col justify-start items-start gap-2 w-full m-auto pb- md:pb-8"
        >
          <h2 className="self-stretch justify-start text-[#051420] text-[28px] md:text-[40px] capitalize">
            With MetaBridge you already know what you're up against
          </h2>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-[_1fr_1fr] gap-2 md:gap-6">
          {/* Grid 1 */}
          <motion.div
            ref={grid1Ref}
            initial="hidden"
            animate={grid1InView ? "visible" : "hidden"}
            variants={gridVariants(0.2)}
            className="px-5 md:px-10 py-10 md:py-[53px] rounded-[30px]"
            style={{
              backgroundImage: `url(${GridImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <h3 className="text-white text-[24px] md:text-[28px] capitalize mb-5">
              what you get
            </h3>
            <div className="space-y-3">
              {[
                "instant top-ups",
                "stable accounts",
                "zero spending limits",
                "flexible credit",
                "dedicated support.",
              ].map((text, idx) => (
                <div className="flex items-center gap-3" key={idx}>
                  <svg
                    className="w-6 h-6 text-[#c0d5df] flex-shrink-0"
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
                  <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Grid 2 */}
          <motion.div
            ref={grid2Ref}
            initial="hidden"
            animate={grid2InView ? "visible" : "hidden"}
            variants={gridVariants(0.4)}
            className="px-5 md:px-10 py-10 md:py-[53px] rounded-[30px]"
            style={{
              backgroundImage: `url(${GridImage2})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <h3 className="text-white text-[24px] md:text-[28px] capitalize mb-5">
              You don't get
            </h3>
            <div className="space-y-3">
              {[
                "sudden bans",
                "weeks lost with tickets",
                "blocks without explanation",
              ].map((text, idx) => (
                <div className="flex items-center gap-3" key={idx}>
                  <svg
                    className="w-6 h-6 text-[#c0d5df] flex-shrink-0"
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
                  <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div
          ref={buttonRef}
          initial="hidden"
          animate={buttonInView ? "visible" : "hidden"}
          variants={gridVariants(0.6)}
          className="flex items-center space-x-4 justify-center mt-6 md:mt-10"
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

export default MetaBridgeGridSection;
