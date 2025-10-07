import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import MetaEcosystem from "../../Assets/meta-ecosystem.png";
import ContactButton from "../ContactButton";

const ChooseMetabridgeSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            className="w-full py-10 md:py-16"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 200 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } }
            }}
        >
            <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
                <div className="relative bg-[#b2cad9] rounded-[32px] py-10 md:py-16 px-5 md:px-12 flex flex-col lg:flex-row lg:space-x-12 space-y-6 lg:space-y-0">

                    <motion.div
                        className="w-full lg:w-[40%]"
                        initial={{ opacity: 0, x: -200, rotate: -5 }}
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, x: -200, rotate: -5 },
                            visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 1 } }
                        }}
                    >
                        <h2 className="text-[#051420] text-[28px] md:text-[40px] capitalize">
                            Why waste time when you can leave right away? 
                        </h2>
                        <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mt-4">
                            We know how much every hour lost with a blocked account or a ridiculous spending limit costs.
                            That's why we offer you ready-made, solid and certified assets, so you can focus on what matters: your campaigns.
                        </p>
                        <div className="flex items-center space-x-4 mt-5 md:mt-7">
                            <ContactButton />
                        </div>
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-[60%]"
                        initial={{ opacity: 0, x: 200, rotate: 5 }}
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, x: 200, rotate: 5 },
                            visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 1 } }
                        }}
                    >
                        <img
                            className="w-full max-w-2xl m-auto"
                            src={MetaEcosystem}
                            alt="Meta Ecosystem"
                        />
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}

export default ChooseMetabridgeSection;
