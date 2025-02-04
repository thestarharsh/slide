"use server";

import { createAutomation } from "./queries";

import { onCurrentUser } from "../user";

export const getAllAutomations = async () => {
    const user = await onCurrentUser();
    try {
        const create = await createAutomation(user.id);
        if (create) return { status: 200, data: "Automaion created" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};
