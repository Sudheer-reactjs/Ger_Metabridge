import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import GridImage1 from "../../Assets/grid-bg1.jpg"
import GridImage2 from "../../Assets/grid-bg2.jpg"

const MetaBridgeGridSection = () => {
     const ref = useRef(null);
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
  // Variants with staggered delays
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14, duration: 0.8 } as any },
  };

  const gridVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14, duration: 0.9, delay } as any },
  });
    

    return (
        <section className=" w-full py-10 md:py-24 bg-[#f1f5f8] rounded-b-[21px] overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
                <motion.div className="self-stretch flex flex-col justify-start items-start gap-2 w-full m-auto pb- md:pb-8"
                   ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={headingVariants}
                >
                    <h2 className="self-stretch justify-start text-[#051420] text-[28px] md:text-[40px] capitalize">
                        With MetaBridge you already know what you're up against
                    </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-[_1fr_1fr] gap-2 md:gap-6">

                    <motion.div className="px-5 md:px-10 py-10 md:py-[53px] rounded-[30px]"
                        style={{
                            backgroundImage: `url(${GridImage1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top center',
                        }}
                          ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={gridVariants(.4)}
                    >
                        <h3 className=" text-white text-[24px] md:text-[28px] capitalize mb-5">what you get</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    instant top-ups
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    stable accounts
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    zero spending limits
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    flexible credit
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    dedicated support.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="px-5 md:px-10 py-10 md:py-[53px] rounded-[30px]"
                        style={{
                            backgroundImage: `url(${GridImage2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top center',
                        }}
                          ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={gridVariants(0.6)}
                    >
                        <h3 className=" text-white text-[24px] md:text-[28px] capitalize mb-5">You don't get</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    sudden bans
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    weeks lost with tickets
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#c0d5df] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <p className="text-[#c0d5df] text-sm satoshi-regular capitalize">
                                    blocks without explanation
                                </p>
                            </div>
                        </div>
                    </motion.div>


                </div>

            </div>
        </section>
    );
}

export default MetaBridgeGridSection;
