/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, useEffect } from "react";

import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

    useEffect(() => {
        if (window.Razorpay) {
            setIsRazorpayLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            setIsRazorpayLoaded(true);
        };
        script.onerror = () => {
            setError("Failed to load Razorpay SDK");
        };
        
        document.body.appendChild(script);
        
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const onSubscribe = async () => {
        if (!isRazorpayLoaded) {
            setError("Razorpay SDK is not loaded yet. Please try again.");
            return;
        }

        setIsProcessing(true);
        setError(null);
        
        try {
            const response = await axios.post('/api/payment');
            const { subscription_id, key } = response.data;
            
            const razorpay = new window.Razorpay({
                key,
                subscription_id,
                name: "Slide",
                description: "Monthly Subscription",
                theme: { color: "#3399cc" },
                handler: async function(response: any) {
                    console.log("Payment successful:", response);
                    toast.success("Subscription successful!");
                    try {
                        await axios.post('/api/subscribe', {
                            customerId: response.razorpay_subscription_id,
                        });
                    } catch (error: any) {
                        console.error("Subscription Update Error:", error);
                    }
                },
                modal: {
                    ondismiss: function() {
                        setIsProcessing(false);
                    }
                }
            });
            
            razorpay.open();
            setIsProcessing(false);
        } catch (error: any) {
            console.error("Subscription Error:", error);
            setError(error?.response?.data?.error || error.message || "Failed to process subscription");
            setIsProcessing(false);
        }
    };

    return { isProcessing, error, onSubscribe, isRazorpayLoaded };
};
