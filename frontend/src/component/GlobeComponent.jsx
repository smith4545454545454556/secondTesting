import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
    const globeEl = useRef(); // Reference to the Globe component
    const [showPopup, setShowPopup] = useState(false);

    // Kathmandu, Nepal coordinates
    const katmanduCoords = { lat: 27.7172, lng: 85.3240 };

    useEffect(() => {
        const globe = globeEl.current;

        if (globe) {
            // Enable rotation but disable zooming
            globe.controls().enableZoom = false;
            globe.controls().enablePan = false; // Optional: Prevent panning
            globe.controls().autoRotate = true; // Enable auto-rotate
            globe.controls().autoRotateSpeed = 1.5;

            // Check when the globe rotates to Kathmandu
            const rotationInterval = setInterval(() => {
                const { lat, lng } = globe.pointOfView();
                const distance = Math.sqrt(
                    Math.pow(lat - katmanduCoords.lat, 2) +
                    Math.pow(lng - katmanduCoords.lng, 2)
                );

                // Show popup if within a small proximity to Kathmandu
                if (distance < 1) {
                    setShowPopup(true);
                } else {
                    setShowPopup(false);
                }
            }, 100); // Check every 100ms

            return () => clearInterval(rotationInterval);
        }
    }, []);

    return (
        <div className="globe-container" style={{ position: "relative" }}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="#e0e0e0"
                width={400}
                height={400}
                labelsData={[{ ...katmanduCoords, label: "Kathmandu" }]}
                labelText={({ label }) => label} // Display label text
                labelSize={3} // Increased text size (key change)
                labelDotRadius={1.5} // Increase the pin size
                labelColor={() => "white"} // Pin color
            />

            {/* Popup that appears when Kathmandu is in view */}
            {showPopup && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(255, 255, 255, 0.9)",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        color: "#000",
                        fontWeight: "bold",
                        zIndex: 10,
                    }}
                >
                    🌏 Kathmandu, Nepal
                </div>
            )}
        </div>
    );
};

export default GlobeComponent;
