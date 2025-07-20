"use server";

import axios from "axios";
import { redirect } from "next/navigation";

import { generateTokens } from "@/lib/fetch";

import { createIntegration, getIntegration } from "./queries";
import { onCurrentUser } from "../user";

export const onAuthInstagram = async (strategy: "INSTAGRAM" | "CRM") => {
    if (strategy === "INSTAGRAM") {
        return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL! as string);
    }
};

export const onIntegrate = async (code: string) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");

    try {
        const integration = await getIntegration(user?.id);
        if (integration && integration.integrations.length === 0) {
            const token = await generateTokens(code);
            console.log(token);

            if (token) {
                const insta_id = await axios.get(
                    `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
                );
                const today = new Date();
                const expiryDate = today.setDate(today.getDate() + 60);
                const create = await createIntegration(
                    user.id,
                    token.access_token,
                    new Date(expiryDate),
                    insta_id.data.user_id
                );

                if (create) {
                    return { status: 200, data: create };
                }

                return { status: 401 };
            }

            return { status: 404 }
        }
    } catch (error) {
        console.log("Error while integration: ", error);
        return { status: 500 };
    }
};
