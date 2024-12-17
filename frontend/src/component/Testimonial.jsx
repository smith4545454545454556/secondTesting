import React, { useState, useEffect } from 'react';

// Testimonial data
const testimonials = [
    {
        name: "John Doe",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "This platform has revolutionized the way we do business! The tools are incredibly intuitive and have helped us increase our efficiency by 30%. The team’s support is outstanding. Highly recommended!",
        rating: 5,
    },
    {
        name: "Jane Smith",
        role: "user",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "I have been using this service for months, and the results speak for themselves. It's easy to use, and the features are second to none. I couldn't be happier with my decision to join!",
        rating: 4,
    },
    {
        name: "Mark Johnson",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "What I love most is the user-friendly interface and the attention to detail. The design is sleek, and the customer service is always there when you need it. I’ll definitely keep using this in the future!",
        rating: 5,
    },
    {
        name: "John Doe",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "This platform has revolutionized the way we do business! The tools are incredibly intuitive and have helped us increase our efficiency by 30%. The team’s support is outstanding. Highly recommended!",
        rating: 5,
    },
    {
        name: "Jane Smith",
        role: "user",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "I have been using this service for months, and the results speak for themselves. It's easy to use, and the features are second to none. I couldn't be happier with my decision to join!",
        rating: 4,
    },
    {
        name: "Mark Johnson",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "What I love most is the user-friendly interface and the attention to detail. The design is sleek, and the customer service is always there when you need it. I’ll definitely keep using this in the future!",
        rating: 5,
    },
    {
        name: "John Doe",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "This platform has revolutionized the way we do business! The tools are incredibly intuitive and have helped us increase our efficiency by 30%. The team’s support is outstanding. Highly recommended!",
        rating: 5,
    },
    {
        name: "Jane Smith",
        role: "user",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "I have been using this service for months, and the results speak for themselves. It's easy to use, and the features are second to none. I couldn't be happier with my decision to join!",
        rating: 4,
    },
    {
        name: "Mark Johnson",
        role: "artist",
        image: "/images/cover.png", // Replace with actual image path
        testimonial:
            "What I love most is the user-friendly interface and the attention to detail. The design is sleek, and the customer service is always there when you need it. I’ll definitely keep using this in the future!",
        rating: 5,
    },
];

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalTestimonials = testimonials.length;

    // Function to handle next testimonial
    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(totalTestimonials / 2));
    };

    // Function to handle previous testimonial
    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + Math.ceil(totalTestimonials / 2)) % Math.ceil(totalTestimonials / 2)
        );
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-semibold mb-8 text-[#614fd1]">What Our Clients Say</h2>

                <div className="relative w-full overflow-hidden">
                    {/* Wrapper for sliding testimonials */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 50}%)`, // Move testimonials horizontally, 50% to show two at once
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-1/2 px-4" // Set width to 50% to show two testimonials per slide
                                data-aos="fade-up"
                            >
                                <div className="bg-white p-8 rounded-lg shadow-2xl">
                                    <div className="flex justify-center mb-6">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                                        />
                                    </div>
                                    <p className="text-lg text-[#6A5ACD] italic mb-4">
                                        {`"${testimonial.testimonial}"`}
                                    </p>
                                    <div className="flex justify-center mb-4">
                                        {Array.from({ length: testimonial.rating }, (_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 15.27l5.45 3.18-1.45-6.27L19 7.91l-6.36-.54L10 1 7.36 7.37 1 7.91l4.91 4.27-1.45 6.27L10 15.27z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="font-semibold text-[#6A5ACD]">{testimonial.name}</p>
                                    <p className="text-[#6A5ACD]">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div
                        onClick={prevTestimonial}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-50 bg-black text-white p-3 rounded-full cursor-pointer z-10"
                    >
                        <button>⟵</button>
                    </div>
                    <div
                        onClick={nextTestimonial}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-opacity-50 bg-black text-white p-3 rounded-full cursor-pointer z-10"
                    >
                        <button>⟶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
