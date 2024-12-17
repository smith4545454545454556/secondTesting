import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

const Zoom = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to(".mask-clip-path", {
            width: "75vw",
            height: "75vh",
            borderRadius: 0,
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 flex flex-col items-center gap-5">
                <p className="font-medium text-[#6A5ACD] tracking-wider drop-shadow-lg font-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
                    Join now
                </p>




            </div>

            <div className="h-dvh w-screen " id="clip" >
                <div className="mask-clip-path about-image">
                    <img
                        src="/images/galleryCover.png"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Zoom;
