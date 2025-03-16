"use client";

import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useQueryAutomation } from "@/hooks/user-queries";
import { useTriggers } from "@/hooks/use-automations";
import { AUTOMATION_TRIGGER } from "@/constants/automation";
import { Separator } from "@/components/ui/separator";
import ThenAction from "@/components/global/automations/then/then-action";
import { cn } from "@/lib/utils";

import ActiveTriggger from "./active";
import Keywords from "./keywords";
import TriggerButton from "../trigger-button";

type TriggerProps = {
  id: string;
};

const Trigger = ({ id }: TriggerProps) => {
  const { data } = useQueryAutomation(id);
  const { isPending, onSaveTrigger, onSetTrigger, types } = useTriggers(id);

  if (data?.data && data?.data?.trigger?.length) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        <ActiveTriggger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />
        {data?.data?.trigger?.length > 1 && (
          <>
            <div className="relative w-6/12 mt-2">
              <p className="absolute transform px-2 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-text-secondary">
                OR
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px] w-full"
              />
            </div>
            <ActiveTriggger
              type={data.data.trigger[1].type}
              keywords={data.data.keywords}
            />
          </>
        )}
        {!data.data.listeners && <ThenAction id={id} />}
      </div>
    );
  }

  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGER.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "hover: opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2",
              !types?.find((t) => t === trigger.type)
                ? "bg-background-80"
                : "bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id}/>
        <Button 
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white font-medium"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  );
};

export default Trigger;
