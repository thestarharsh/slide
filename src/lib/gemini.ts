/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { remark } from "remark";
import strip from "strip-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateSmartAIResponse(prompt: string, chatHistory?: any[]) {
    try {
        if (!prompt || prompt.trim().length === 0) {
            return "Can you please provide more details? 😊";
        }

        let conversationContext = "";
        if (chatHistory && chatHistory.length > 0) {
            conversationContext = chatHistory.map(msg => 
                `${msg.isFromBot ? "Assistant: " : "User: "}${msg.content}`
            ).join("\n") + "\n";
        }

        const systemPrompt = `
        You are an Instagram DM assistant that replies like a friendly human.
        - Stay **polite, engaging, and concise**.
        - Never give **off-topic or unrelated** responses.
        - If a question is unclear, **ask for clarification** instead of guessing.
        - Keep responses **always under 2 sentences**, avoiding robotic tones.

        Previous conversation:
        ${conversationContext}
        
        User's message: "${prompt}"
        `;

        const result = await model.generateContent(systemPrompt);
        const text = result.response.text();

        const processedText = await remark().use(strip).process(text);

        return processedText.toString().trim();
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        if (error.response?.status === 429) {
            return "Oops! Too many requests right now. Try again in a few minutes. 🚀";
        }
        if (error.response?.status === 500) {
            return "Hmm, seems like an issue on our end. Give me a moment to fix it! ⏳";
        }

        return "We'll get back to you in some time. Hold tight till then! 🤖✨";
    }
}
