import React, { useState } from "react";
import GlobeComponent from "../component/GlobeComponent";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ name: "", email: "", message: "" }); // Reset form
    };

    return (
        <section id="contact" className=" mt-2">
            <h1 className="text-center text-[#681dad] text-4xl md:text-6xl font-semibold uppercase tracking-wider mb-5 ">
                Contact Us
            </h1>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-4 ">
                {/* Contact Form */}
                <form
                    id="contact-form"
                    className="w-full md:w-[40%] bg-[#8f2aec] p-8 rounded-lg shadow-lg"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                        Get in Touch
                    </h2>
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-200 mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className=" placeholder-black w-full px-4 py-3 text-gray-900 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082]"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-200 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className=" placeholder-black w-full px-4 py-3 text-gray-900 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082]"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-200 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            placeholder="Write your message here"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className=" placeholder-black w-full px-4 py-2 text-gray-900 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082]"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full  text-white font-semibold rounded-lg hover:text-gray-400 transition-all"
                    >
                        Send Message
                    </button>
                </form>


                {/* Globe Component */}

                <div className="w-full md:w-[50%] flex justify-center items-center">
                    <GlobeComponent />
                </div>
            </div>
        </section>
    );
};

export default Contact;
