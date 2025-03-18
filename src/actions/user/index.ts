"use server";

import { currentUser } from "@clerk/nextjs/server";
import { refreshToken } from "@/lib/fetch";

import { createSubscription, createUser, findUser } from "./queries";

import { updateIntegration } from "../integrations/queries";

export const onCurrentUser = async () => {
    const user = await currentUser();
    if (!user) return null;
    return user;
};

export const onBoardUser = async () => {
    const user = await onCurrentUser();
    if (!user) return { status: 400, message: "No User Found" };
    try {
        const found = await findUser(user?.id);
        if (found) {
            if (found?.integrations?.length) {
                const today = new Date();
                const expiresAt = found.integrations[0]?.expiresAt;
                const timeLeft = expiresAt ? expiresAt.getTime() - today.getTime() : 0;

                const days = Math.round(timeLeft / (1000 * 3600 * 24));
                if (days < 5) {
                    console.log("Refreshing token for", user?.id);
                    const refresh = await refreshToken(found?.integrations[0]?.token);

                    const today = new Date();
                    const expiryDate = today.setDate(today.getDate() + 60);

                    const updateToken = await updateIntegration(
                        refresh.refreshToken,
                        new Date(expiryDate),
                        found.integrations[0].id,
                    );

                    if (!updateToken) {
                        console.log("Token update failed");
                    }
                }
            }
            return {
                status: 200,
                data: {
                    firstname: found?.firstname,
                    lastname: found?.lastname,
                },
            };
        }

        const created = await createUser(
            user.id,
            user.firstName!,
            user.lastName!,
            user.emailAddresses[0].emailAddress,
        );

        return { status: 201, data: created };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const onUserInfo = async () => {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) return { status: 400, message: "No User Found" };
    try {
        const profile = await findUser(userId);
        if (profile) return { status: 200, data: profile };

        return { status: 404 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const onSubscribe = async (customerId: string) => {
    const user = await currentUser();
    if (!user) return { status: 400, message: "No User Found" };
    try {
        const found = await findUser(user.id);
        if (found) {
            const subscription = await createSubscription(
                user.id,
                "PRO",
                customerId,
            );
            if (subscription) return { status: 200, data: subscription };
            return { status: 404 };
        }
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }    
};
