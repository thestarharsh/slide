import { useListener } from "@/hooks/use-automations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AUTOMATION_LISTENER } from "@/constants/automation";
import Loader from "@/components/global/loader";
import SubscriptionPlan from "@/components/global/subscription-plan";
import { cn } from "@/lib/utils";

import TriggerButton from "../trigger-button";

type ThenActionProps = {
  id: string;
};

const ThenAction = ({ id }: ThenActionProps) => {
  const {
    isPending,
    listener: Listener,
    onFormSubmit,
    onSetListener,
    register,
  } = useListener(id);

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_LISTENER.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                    : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover: opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p className="text-[#768BDD] font-bold">{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover: opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p className="text-[#768BDD] font-bold">{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
            <Textarea 
                placeholder={
                    Listener === "MESSAGE"
                    ? "Enter the message you want to send to the client"
                    : "Tell AI about the type of response you want to send"
                }
                {...register("prompt")}
                className="bg-background-80 outline-none border-none ring-0 focus:ring-0 focus:ring-transparent"
            />
            <Input 
                placeholder="Add a reply for comments (Optional)"
                {...register("reply")}
                className="bg-background-80 outline-none border-none ring-0 focus:ring-0 focus:ring-transparent"
            />
            <Button
                className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white font-medium"
            >
                <Loader state={isPending}>
                    Add Listener
                </Loader>
            </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
