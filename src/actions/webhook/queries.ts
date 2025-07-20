import { client } from "@/lib/prisma";

export const matchKeyword = async (keyword: string) => {
    return await client.keyword.findFirst({
        where: {
            word: {
                equals: keyword,
                mode: "insensitive",
            },
        },
    });
};

export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
    return await client.automation.findUnique({
        where: {
            id: automationId,
        },
        include: {
            dms: dm,
            trigger: {
                where: {
                    type: dm ? "DM" : "COMMENT",
                },
            },
            listeners: true,
            User: {
                select: {
                    subscription: {
                        select: {
                            plan: true,
                        },
                    },
                    integrations: {
                        select: {
                            token: true,
                        },
                    },
                },
            },
        },
    });
};

export const trackResponses = async (
    automationId: string,
    type: "COMMENT" | "DM",
) => {
    if (type === "COMMENT") {
        return await client.listener.update({
            where: {
                automationId,
            },
            data: {
                commentCount: {
                    increment: 1,
                },
            },
        });
    }

    if (type === "DM") {
        return await client.listener.update({
            where: {
                automationId,
            },
            data: {
                dmCount: {
                    increment: 1,
                },
            },
        });
    }
};

export const createChatHistory = (
    automationId: string,
    sender: string,
    receiver: string,
    message: string
) => {
    return client.automation.update({
        where: {
            id: automationId
        },
        data: {
            dms: {
                create: {
                    receiver,
                    senderId: sender,
                    message,
                },
            },
        },
    });
};

export const getKeywordPost = async (
    automationId: string,
    postId: string,
) => {
    return await client.post.findFirst({
        where: {
            AND: [
                { id: postId },
                { automationId }
            ],
        },
        select: {
            automationId: true,
        },
    });
};

export const getChatHistory = async (sender: string, receiver: string) => {
    const history = await client.dms.findMany({
        where: {
            AND: [{ senderId: sender }, { receiver }],
        },
        orderBy: { createdAt: "asc" },
    });
    
    const messageHistory = history.map((chat) => {
        return {
            content: chat.message || "",
            isFromBot: Boolean(chat.receiver),
            timestamp: chat.createdAt
        };
    });

    return {
        history: messageHistory,
        automationId: history.length > 0 ? history[history.length - 1].automationId : null,
    };
};
