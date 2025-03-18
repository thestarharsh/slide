"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePath } from "@/hooks/use-nav";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomations } from "@/hooks/user-queries";
import { cn, getMonth } from "@/lib/utils";
import { Keyword } from "@/types";

import GradientButton from "../gradient-button";
import CreateAutomation from "../create-automation";

const AutomationList = () => {
  const { data } = useQueryAutomations();
  const { latestVariable } = useMutationDataState(["create-automation"]);
  const { pathname } = usePath();

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations</h3>
        <CreateAutomation />
      </div>
    );
  }

  const optimisticUIData = {
    data: [
      latestVariable?.variables,
      ...data.data.filter((a) => a.id !== latestVariable?.variables?.id),
    ].filter(Boolean),
  };

  return (
    <div className="flex flex-col gap-y-3">
      {optimisticUIData.data!.map((automation) => (
        <Link
          key={automation.id}
          href={`${pathname}/${automation.id}`}
          className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
        >
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{automation.name}</h2>
            {automation?.trigger?.length > 0 && (
              <p className="text-[#9B9CA0] text-sm font-light mb-2">
                {automation?.trigger?.some(
                  (t: { type: string }) => t?.type === "COMMENT"
                ) &&
                automation?.trigger?.some(
                  (t: { type: string }) => t.type === "DM"
                )
                  ? "via comment and message"
                  : automation?.trigger?.some(
                      (t: { type: string }) => t.type === "COMMENT"
                    )
                  ? "via comment on post"
                  : automation?.trigger?.some(
                      (t: { type: string }) => t.type === "DM"
                    )
                  ? "via message"
                  : "No Trigger Set"}
              </p>
            )}
            {automation.keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {automation.keywords.map((keyword: Keyword, index: number) => (
                  <div
                    key={keyword.id}
                    className={cn(
                      "rounded-full px-4 py-1 capitalize",
                      (index + 1) % 1 === 0 &&
                        "bg-keyword-green/15 border-2 border-keyword-green",
                      (index + 1) % 2 === 0 &&
                        "bg-keyword-purple/15 border-2 border-keyword-purple",
                      (index + 1) % 3 === 0 &&
                        "bg-keyword-yellow/15 border-2 border-keyword-yellow",
                      (index + 1) % 4 === 0 &&
                        "bg-keyword-red/15 border-2 border-keyword-red"
                    )}
                  >
                    {keyword.word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{" "}
              {automation.createdAt.getUTCDate() === 1
                ? `
                ${automation.createdAt.getUTCDate()}st
              `
                : `
                ${automation.createdAt.getUTCDate()}th
              `}{" "}
              {automation.createdAt.getUTCFullYear()}
            </p>
            {automation.listeners?.listener === "SMARTAI" ? (
              <GradientButton
                type="BUTTON"
                className="w-full bg-background-80 text-white hover:bg-background-80"
              >
                Smart AI
              </GradientButton>
            ) : (
              <Button className="bg-background-80 hover:bg-background-80 text-white">
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
