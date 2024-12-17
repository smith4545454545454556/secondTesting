import React, { useState } from 'react';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [orderSummary, setOrderSummary] = useState({
        subtotal: 120,
        shipping: 10,
        tax: 12,
        total: 142,
    });
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Handle Order Submission
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        console.log('Order Submitted', orderSummary, billingDetails);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            {/* Checkout Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-semibold text-[#412ec2]">Checkout</h1>
                <p className="text-sm text-gray-600">Complete your purchase by filling in your details below.</p>
            </div>

            {/* Checkout Form and Order Summary */}
            <div className="flex  justify-between gap-12">
                {/* Left side - Billing Information */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmitOrder}>
                        <h3 className="text-2xl font-semibold text-[#412ec2] mb-6">Billing Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={billingDetails.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={billingDetails.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={billingDetails.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={billingDetails.city}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={billingDetails.zip}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
                            <select
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="credit-card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank-transfer">Bank Transfer</option>
                            </select>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#412ec2] text-white rounded-md hover:bg-[#2b1e81] transition"
                            >
                                Complete Order
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right side - Order Summary */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-[#412ec2] mb-6">Order Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className=' text-gray-800'>Subtotal</span>
                            <span>${orderSummary.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className=' text-gray-800'>Shipping</span>
                            <span>${orderSummary.shipping}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className=' text-gray-800'>Tax</span>
                            <span>${orderSummary.tax}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span className=' text-[#412ec2] text-2xl'>Total</span>
                            <span>${orderSummary.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
