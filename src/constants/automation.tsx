import { JSX } from "react";
import { v4 } from "uuid";

import { PlaneBlue, SmartAi, TinyInstagram } from "@/icons";

export type AutomationListenerProps = {
    id: string;
    label: string;
    icon: JSX.Element;
    description: string;
    type: "MESSAGE" | "SMARTAI";
};

export type AutomationTriggerProps = {
    id: string;
    label: string;
    icon: JSX.Element;
    description: string;
    type: "COMMENT" | "DM";
};

export const AUTOMATION_TRIGGER: AutomationTriggerProps[] = [
    {
        id: v4(),
        label: "User comments on my post",
        icon: <TinyInstagram />,
        description: "Select if you want to automate comments on your post.",
        type: "COMMENT",
    },
    {
        id: v4(),
        label: "User sends a DM",
        icon: <TinyInstagram />,
        description: "Select if you want to automate DMs on your profile.",
        type: "DM",
    },
];

export const AUTOMATION_LISTENER: AutomationListenerProps[] = [
    {
        id: v4(),
        label: "Send the user a message",
        icon: <PlaneBlue />,
        description: "Enter the message you want to send to the client",
        type: "MESSAGE",
    },
    {
        id: v4(),
        label: "Let the Smart AI handle it",
        icon: <SmartAi />,
        description: "Tell AI about the type of response you want to send (Please upgrade to use this feature)",
        type: "SMARTAI",
    },
];
