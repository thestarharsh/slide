import { ReactNode } from "react";

import { useQueryUser } from "@/hooks/user-queries";

type SubscriptionPlanProps = {
    type: "FREE" | "PRO";
    children: ReactNode;
};

const SubscriptionPlan = ({ type, children}: SubscriptionPlanProps) => {
    const { data } = useQueryUser();
    return data?.data?.subscription?.plan === type ? children : null;
};

export default SubscriptionPlan;
