"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { activateAutomation } from "@/actions/automations";
import { useQueryAutomation } from "@/hooks/user-queries";
import { useMutationData } from "@/hooks/use-mutation-data";
import { ActiveAutomation } from "@/icons/active-automation";

type ActivateAutomationButtonProps = {
  id: string;
};

const ActivateAutomationButton = ({ id }: ActivateAutomationButtonProps) => {
  const { data } = useQueryAutomation(id);
  const { mutate, isPending } = useMutationData(
    ["activate"],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    "automation-info"
  );

  return (
    <Button
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4"
      disabled={isPending}
    >
      {isPending && <Loader2 className="animate-spin" />}
      <ActiveAutomation />
      <p className="lg:inline hidden">
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;
