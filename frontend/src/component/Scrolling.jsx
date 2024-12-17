import React, { useRef } from "react";
import { useTransform, motion, useScroll } from "framer-motion";

const click = "/images/painting/click.png";
const painting = "/images/painting/painting1.jpg";
const sculpture = "/images/sculpture.png";
const wallart = "/images/wallart/wallart.png"
const photo = "/images/photograaphy/photo.png";


const Scrolling = () => {
    // Reference for the scrollable area
    const targetRef = useRef(null);

    // Scroll progress hook
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Transform the scroll progress to control the horizontal movement
    const x = useTransform(scrollYProgress, [0, 0, 0, 1], ["90%", "60%", "30%", "-50%"]);

    return (
        <section ref={targetRef} className="relative h-[148vh] overflow-hidden">
            <div className="sticky top-0 h-[65vh] flex items-end justify-center">
                <p className="font-bold text-3xl uppercase leading-tight md:text-[6rem] z-50 text-[#6656ce] tracking-wider drop-shadow-lg">
                    <span className="md:inline sticky z-50">Collections</span>
                </p>
            </div>

            <motion.div
                style={{ x }}
                className="flex gap-16 py-5 min-w-[350%] overflow-x-visible"
            >
                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={photo} alt="photo" className="rounded-lg h-60 object-cover " />
                </div>

                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={sculpture} alt="sculpture" className="rounded-lg h-60 object-cover" />
                </div>

                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={click} alt="click" className="rounded-lg h-60 object-cover" />
                </div>

                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={sculpture} alt="Sculpture" className="rounded-lg h-60 object-cover" />
                </div>
                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={sculpture} alt="Sculpture" className="rounded-lg h-60 object-cover" />
                </div>
                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={wallart} alt="wallart" className="rounded-lg h-60 object-cover" />
                </div>

                <div className="w-[420px] h-[420px] flex-shrink-0">
                    <img src={painting} alt="painting" className="rounded-lg h-60 object-cover" />
                </div>
            </motion.div>


        </section>
    );
};

export default Scrolling;
