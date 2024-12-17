import React from 'react';

const AdvancedCardSection = () => {
    const cards = [
        {
            title: "Authentication",
            description: "Implement a secure and user-friendly authentication system that ensures only authorized users can access certain parts of the application.",
            image: "/images/authentication.png", // Replace with your image path
            link: "/card1",
        },
        {
            title: "Real Time Feature",
            description: "Our real-time feature ensures instant updates and seamless interaction on your platform. By leveraging real-time communication protocols, this feature allows for immediate notifications, live updates.",
            image: "/images/realtime.png", // Replace with your image path
            link: "/card2",
        },
        {
            title: "Responsive",
            description: "Our platform offers a fully responsive design that ensures an optimal user experience across all devices, from desktop computers to tablets and smartphones",
            image: "/images/responsive.jpg", // Replace with your image path
            link: "/card3",
        },
    ];

    return (
        <div className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-6xl font-semibold mb-8 text-[#412ec2]">Features</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className=" shadow-lg rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-56 object-cover transition-all duration-300 "
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">{card.title}</h3>
                                <p className="text-gray-600 mb-4">{card.description}</p>
                                <a
                                    href={card.link}
                                    className="inline-block  text-black px-6 py-2 rounded-lg text-lg font-semibold transform transition-all duration-300 "
                                >
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedCardSection;
