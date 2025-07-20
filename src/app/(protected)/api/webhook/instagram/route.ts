import { NextRequest, NextResponse } from "next/server";

import { findAutomation } from "@/actions/automations/queries";
import { createChatHistory, getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponses } from "@/actions/webhook/queries";
import { sendDM } from "@/lib/fetch";
import { generateSmartAIResponse } from "@/lib/gemini";
import { client } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get("hub.challenge");
    return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
    const webhook_payload = await req.json();
    let matcher;
    try {
        if (webhook_payload?.entry[0]?.messaging) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].messaging[0].message.text
            );
        }

        if (webhook_payload?.entry[0]?.changes) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            );
        }

        if (matcher && matcher.automationId) {
            if (webhook_payload?.entry[0]?.messaging) {
                const automation = await getKeywordAutomation(matcher.automationId, true);
                if (automation && automation.trigger) {
                    const token = automation.User?.integrations[0]?.token;

                    if (!token) {
                        console.error("Token is missing");
                        return;
                    }
                    if (automation.listeners && automation.listeners.listener === "MESSAGE") {
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation?.listeners?.prompt,
                            token,
                        );

                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, "DM");
                            if (tracked) {
                                return NextResponse.json(
                                    {
                                        message: "Message Sent"
                                    },
                                    {
                                        status: 200,
                                    }
                                );
                            }
                        }
                    }
                    if (automation?.listeners && automation.listeners?.listener === "SMARTAI" && automation?.User?.subscription?.plan === "PRO") {
                        const smart_ai_message = await generateSmartAIResponse(automation?.listeners?.prompt);
                        if (smart_ai_message) {
                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text,
                            );

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message,
                            );

                            await client.$transaction([receiver, sender]);

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message,
                                automation.User.integrations[0].token!,
                            );

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, "DM");
                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: "Message Sent"
                                        },
                                        {
                                            status: 200,
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
            }

            if (webhook_payload?.entry[0]?.changes && webhook_payload?.entry[0]?.changes[0]?.field === "comments") {
                const automation = await getKeywordAutomation(matcher.automationId, false);

                if (!automation) {
                    console.error("Automation not found");
                    return NextResponse.json({ error: "Automation not found" }, { status: 404 });
                }

                const automation_post = await getKeywordPost(automation.id!, webhook_payload.entry[0].changes[0].value.media.id);
                if (automation && automation_post && automation.trigger) {
                    if (automation.listeners) {
                        if (automation.listeners?.listener === "MESSAGE") {
                            const token = automation.User?.integrations[0]?.token;

                            if (!token) {
                                console.error("Token is missing");
                                return;
                            }

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.from.id,
                                automation.listeners?.prompt,
                                token,
                            );

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, "COMMENT");
                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: "Message Sent"
                                        },
                                        {
                                            status: 200,
                                        }
                                    );
                                }
                            }
                        }

                        if (automation.listeners?.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO") {
                            const smart_ai_message = await generateSmartAIResponse(automation?.listeners?.prompt);
                            if (smart_ai_message) {
                                const receiver = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text,
                                );

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message
                                );

                                await client.$transaction([receiver, sender]);

                                const token = automation.User?.integrations[0]?.token;

                                if (!token) {
                                    console.error("Token is missing");
                                    return;
                                }

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message,
                                    token,
                                );

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponses(automation.id, "COMMENT");
                                    if (tracked) {
                                        return NextResponse.json(
                                            {
                                                message: "Message Sent"
                                            },
                                            {
                                                status: 200,
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].recipient.id,
                webhook_payload.entry[0].messaging[0].sender.id,
            );

            if (customer_history.history.length > 0) {
                const automation = await findAutomation(customer_history.automationId!);

                if (
                    automation?.User?.subscription?.plan === "PRO" &&
                    automation.listeners?.listener === "SMARTAI" &&
                    automation.active
                ) {
                    // Generate a smart AI response using the history and automation prompt
                    const smart_ai_message = await generateSmartAIResponse(
                        automation.listeners?.prompt || "You are a helpful assistant.",
                        customer_history.history
                    );

                    if (smart_ai_message) {
                        const receiver = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text,
                        );

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message,
                        );

                        await client.$transaction([receiver, sender]);

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message,
                            automation.User.integrations[0].token!,
                        );

                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, "DM");
                            if (tracked) {
                                return NextResponse.json(
                                    { message: "Message sent" },
                                    { status: 200 }
                                );
                            }
                        }
                    }
                } else {
                    const token = automation?.User?.integrations[0]?.token;

                    if (token) {
                        const default_message = "Wait shortly, a person may help you.";

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            default_message,
                            token,
                        );

                        if (direct_message.status === 200) {
                            return NextResponse.json(
                                { message: "Default message sent" },
                                { status: 200 }
                            );
                        }
                    }
                }
            } else {
                return NextResponse.json(
                    { message: "No action taken - new conversation" },
                    { status: 200 }
                );
            }
        }
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            {
                message: "Server error",
            },
            { status: 200 }
        );
    }
}