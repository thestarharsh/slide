import { ReactNode } from "react";

type SubscriptionPlanProps = {
    type: "FREE" | "PRO";
    children: ReactNode;
};

const SubscriptionPlan = ({ type, children}: SubscriptionPlanProps) => {
    return children;
};

export default SubscriptionPlan;
