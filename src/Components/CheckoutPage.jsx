import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { FaLock, FaCreditCard } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ biodataId, userEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const { data: clientSecret } = await axios.post("https://matrify-server.vercel.app/create-payment-intent", {
                amount: 500,
            });

            const card = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (error) {
                Swal.fire("Payment Failed", error.message, "error");
                setProcessing(false);
                return;
            }

            await axios.post("https://matrify-server.vercel.app/contact-requests", {
                biodataId: Number(biodataId),
                userEmail,
                status: "pending",
            });

            Swal.fire({
                title: "Success!",
                text: "Contact request sent for admin approval.",
                icon: "success",
                confirmButtonText: "Go to Dashboard",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard");
                }
            });
        } catch (err) {
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 space-y-6"
        >
            <div className="flex flex-col items-center mb-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg mb-2">
                    <FaCreditCard className="text-white text-3xl" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-1 tracking-tight drop-shadow text-center">
                    Secure Checkout
                </h2>
                <p className="text-gray-600 text-center text-sm">
                    Pay <span className="font-bold text-green-700">$5</span> to request contact information.
                </p>
            </div>
            <div>
                <label className="block font-semibold mb-1 text-gray-700">Biodata ID</label>
                <input
                    value={biodataId}
                    readOnly
                    className="w-full p-2 rounded-lg border border-gray-200 bg-white/60 font-mono"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1 text-gray-700">Your Email</label>
                <input
                    value={userEmail}
                    readOnly
                    className="w-full p-2 rounded-lg border border-gray-200 bg-white/60 font-mono"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1 text-gray-700 flex items-center gap-2">
                    <FaLock className="text-green-600" /> Card Details
                </label>
                <div className="p-3 border rounded-lg bg-white/80 shadow">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#222",
                                "::placeholder": { color: "#888" },
                                fontFamily: "inherit",
                            },
                            invalid: { color: "#e53e3e" }
                        }
                    }} />
                </div>
            </div>
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition text-lg"
            >
                {processing ? "Processing..." : "Pay $5 & Request Contact"}
            </button>
            <div className="text-xs text-gray-500 text-center mt-2">
                <FaLock className="inline mr-1" /> Your payment is secure and encrypted.
            </div>
        </form>
    );
};

const CheckoutPage = () => {
    const { biodataId } = useParams();
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
            <Elements stripe={stripePromise}>
                <CheckoutForm biodataId={biodataId} userEmail={user?.email || ""} />
            </Elements>
        </div>
    );
};

export default CheckoutPage;