"use client";

import { useQueryUser } from "@/hooks/user-queries";

import PaymentCard from "./payment-card";

const Billing = () => {
  const { data } = useQueryUser();
  const isPro = data?.data?.subscription?.plan;
  const currentPlan = isPro ? "PRO" : "FREE";

  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard label="FREE" current={currentPlan} />
      <PaymentCard label="PRO" current={currentPlan} />
    </div>
  );
};

export default Billing;
