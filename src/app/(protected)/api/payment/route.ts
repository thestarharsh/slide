import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {
    const keyId = process.env.RAZORPAY_API_KEY_ID;
    const keySecret = process.env.RAZORPAY_API_KEY_SECRET;
    const planId = process.env.RAZORPAY_PLAN_ID;
    
    if (!keyId || !keySecret || !planId) {
        return NextResponse.json(
            { error: "Missing required environment variables" },
            { status: 500 }
        );
    }

    try {
        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12,
        });

        return NextResponse.json({
            subscription_id: subscription.id,
            key: keyId,
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
