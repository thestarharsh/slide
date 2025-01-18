import { ReactNode } from "react";

type SubscriptionPlanProps = {
    type: "FREE" | "PRO";
    children: ReactNode;
};

export const SubscriptionPlan = ({ type, children}: SubscriptionPlanProps) => {
    return children;
};