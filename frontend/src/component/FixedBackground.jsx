import React from "react";

const BackgroundSection = () => {
    return (
        <div
            className="relative bg-fixed bg-cover bg-center h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/cover.png')",
                position: 'relative',
            }}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
            ></div>

            {/* Content goes here */}
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for better text visibility */}
            <div className="relative z-10 text-center text-white">
                <h1 className="text-6xl font-bold"><span className="text-[#681dad]">Join</span> Us</h1>
                <p className="mt-4 text-2xl">in our<span className=" text-[#681dad]"> journey</span> </p>
            </div>    </div>


    );
};

export default BackgroundSection;
