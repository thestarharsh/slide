"use client";

import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/user-queries";
import { PlaneBlue, SmartAi, Warning } from "@/icons";

type ThenNodeProps = {
  id: string;
};

const ThenNode = ({ id }: ThenNodeProps) => {
  const { data } = useQueryAutomation(id);
  const commentTrigger = data?.data?.trigger?.find((t) => t.type === "COMMENT");

  return !data?.data?.listeners ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 xl:w-6/12 relative p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Warning />
        Then...
      </div>
      <div className="bg-background-80 flex flex-col rounded-xl p-3 gap-y-2">
        <div className="flex gap-x-2 items-center">
            {data?.data?.listeners?.listener === "MESSAGE" ? <PlaneBlue /> : <SmartAi />}
            <p className="font-semibold text-lg">
                {data?.data?.listeners?.listener === "MESSAGE" ? "Send the user a message" : "Let the Smart AI handle it"}
            </p>
        </div>
        <p className="font-light text-text-secondary">
            {data?.data?.listeners?.prompt}
        </p>
      </div>
    </div>
  );
};

export default ThenNode;
