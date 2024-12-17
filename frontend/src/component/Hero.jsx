import React, { useEffect, useRef } from "react";
import { init } from "./Frame.jsx";

function Hero() {
    const threeCanvasRef = useRef(null);

    useEffect(() => {
        // Pass the specific DOM element for Three.js rendering
        if (threeCanvasRef.current) {
            init(threeCanvasRef.current);
        }
    }, []);

    return (
        <div className="hero-section h-[95vh] w-full relative ">

            {/* Three.js Canvas Container */}
            <div
                ref={threeCanvasRef}
                className="absolute top-0 left-0 w-full h-full z-0"
            ></div>
            <p className="absolute top-[35%] left-12 font-bold text-3xl uppercase leading-tight md:text-[6rem] z-0 text-[#6656ce]  tracking-wider drop-shadow-lg">
                <span className="block md:inline">Frame</span> <span className="block md:inline  ">It</span>
            </p>




        </div>
    );
}

export default Hero;
