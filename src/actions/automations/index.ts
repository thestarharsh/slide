"use server";

import { addKeyword, addListener, addTrigger, createAutomation, findAutomation, getAutomations, removeKeyword, updateAutomation } from "./queries";

import { onCurrentUser } from "../user";
import { redirect } from "next/navigation";

export const createAutomations = async (id?: string) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const create = await createAutomation(user.id, id);
        if (create) return { status: 200, data: "Automaion created" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};

export const getAllAutomations = async () => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const automations = await getAutomations(user.id);
        if (automations) return { status: 200, data: automations?.automations };
        return { status: 404, data: [], };
    } catch (error) {
        console.log(error);
        return { status: 500, data: [], };
    }
};

export const getAutomationInfo = async (id: string) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const automation = await findAutomation(id);
        if (automation) return { status: 200, data: automation };
        return { status: 404 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const updateAutomationName = async (
    automationId: string,
    data: {
        name?: string;
        active?: boolean;
        automation?: string;
    },
) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const update = await updateAutomation(automationId, data);
        if (update) return { status: 200, data: "Automation updated successfully." };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};

export const saveListener = async (
    automationId: string,
    listener: "MESSAGE" | "SMARTAI",
    prompt: string,
    reply?: string,
) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const create = await addListener(automationId, listener, prompt, reply);
        if (create) return { status: 200, data: "Listener created successfully" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const create = await addTrigger(automationId, trigger);
        if (create) return { status: 200, data: "Trigger saved successfully" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const create = await addKeyword(automationId, keyword);
        if (create) return { status: 200, data: "Keyword added successfully" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};

export const deleteKeyword = async (automationId: string) => {
    const user = await onCurrentUser();
    if (!user) return redirect("/sign-in");
    try {
        const deleted = await removeKeyword(automationId);
        if (deleted) return { status: 200, data: "Keyword deleted successfully" };
        return { status: 404, data: "Oops! Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: "Internal Server Error" };
    }
};