import { NextResponse } from "next/server";
import { onSubscribe } from "@/actions/user";

export async function POST(req: Request) {
    try {
        const { customerId } = await req.json();
        if (!customerId) {
            return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
        }

        const result = await onSubscribe(customerId);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Subscription API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
