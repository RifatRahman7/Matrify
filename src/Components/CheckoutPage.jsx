import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
                if (result.isConfirmed) navigate("/dashboard");
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
            className="w-full max-w-md dark:bg-slate-900/80 backdrop-blur-lg dark:border dark:border-slate-800 shadow-2xl rounded-2xl p-8 space-y-6 dark:text-gray-100"
        >
            <div className="flex flex-col items-center mb-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg mb-2">
                    <FaCreditCard className="text-white text-3xl" />
                </div>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight text-center">Secure Checkout</h2>
                <p className="dark:text-gray-300 text-center text-sm">
                    Pay <span className="font-bold text-green-400">$5</span> to request contact information.
                </p>
            </div>
            <div>
                <label className="block font-semibold mb-1">Biodata ID</label>
                <input
                    value={biodataId}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg dark:border dark:border-slate-700 dark:bg-slate-800 font-mono dark:text-gray-100"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">Your Email</label>
                <input
                    value={userEmail}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg dark:border dark:border-slate-700 dark:bg-slate-800 font-mono dark:text-gray-100"
                />
            </div>
            <div>
                <label className="block font-semibold mb-1 flex items-center gap-2">
                    <FaLock className="text-green-400" /> Card Details
                </label>
                <div className="p-3 border rounded-lg bg-white dark:bg-slate-700 dark:border dark:border-gray-600 shadow">
                    <div className="p-3 border rounded-lg bg-gray-700 shadow">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#d1d1d1",
                                        "::placeholder": { color: "#aaaaaa" },
                                        "::selection": { color: "#ffffff", background: "#555555" },
                                        iconColor: "#d1d1d1",
                                        fontFamily: "inherit",
                                        "::focus": { color: "#d1d1d1" },
                                    },
                                    invalid: { color: "#e53e3e" },
                                },
                            }}
                        />
                    </div>


                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition text-lg"
            >
                {processing ? "Processing..." : "Pay $5 & Request Contact"}
            </button>
            <div className="text-xs dark:text-gray-400 text-center mt-2">
                <FaLock className="inline mr-1" /> Your payment is secure and encrypted.
            </div>
        </form>
    );
};

const CheckoutPage = () => {
    const { biodataId } = useParams();
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-950 py-12">
            <Elements stripe={stripePromise}>
                <CheckoutForm biodataId={biodataId} userEmail={user?.email || ""} />
            </Elements>
        </div>
    );
};

export default CheckoutPage;
