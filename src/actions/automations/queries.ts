"use server";

import { TRIGGER } from "@prisma/client";
import { client } from "@/lib/prisma";

export const createAutomation = async (clerkId: string, id?: string) => {
    return await client.user.update({
        where: {
            clerkId,
        },
        data: {
            automations: {
                create: {
                    ...(id && { id }),
                },
            },
        },
    });
};

export const getAutomations = async (clerkId: string) => {
    return await client.user.findUnique({
        where: {
            clerkId,
        },
        select: {
            automations: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    keywords: true,
                    listeners: true,
                },
            },
        },
    });
};

export const findAutomation = async (id: string) => {
    return await client.automation.findUnique({
        where: {
            id,
        },
        include: {
            keywords: true,
            listeners: true,
            trigger: true,
            posts: true,
            User: {
                select: {
                    integrations: true,
                    subscription: true,
                },
            },
        },
    });
};

export const updateAutomation = async (
    id: string,
    update: {
        name?: string;
        active?: boolean;
    },
) => {
    return await client.automation.update({
        where: {
            id,
        },
        data: {
            name: update.name,
            active: update.active,
        },
    });
};


export const addListener = async (
    automationId: string,
    listener: "MESSAGE" | "SMARTAI",
    prompt: string,
    reply?: string,
) => {
    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            listeners: {
                create: {
                    listener,
                    prompt,
                    commentReply: reply,
                },
            },
        },
    });
};

export const addTrigger = async (
    automationId: string,
    trigger: string[],
) => {
    if (trigger.length === 2) {
        return await client.automation.update({
            where: {
                id: automationId,
            },
            data: {
                trigger: {
                    createMany: {
                        data: [
                            { type: trigger[0] as TRIGGER },
                            { type: trigger[1] as TRIGGER },
                        ],
                    },
                },
            },
        });
    }

    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            trigger: {
                create: {
                    type: trigger[0] as TRIGGER,
                },
            },
        },
    });
};
