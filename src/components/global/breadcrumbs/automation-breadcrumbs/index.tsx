"use client";

import { ChevronRight, Pencil } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useEditAutomation } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/user-queries";

import ActivateAutomationButton from "../../activate-automation-button";

type AutomationBreadcrumbsProps = {
  id: string;
};

const AutomationBreadcrumbs = ({ id }: AutomationBreadcrumbsProps) => {
  const { data } = useQueryAutomation(id);
  const { edit, enableEdit, inputRef, isPending } =
    useEditAutomation(id);

  const { latestVariable } = useMutationDataState(["update-automation"]);

  return (
    <div className="rounded-full w-full p-5 bg-[#18181B1A] flex items-center">
      <div className="flex items-center gap-x-1 min-w-0">
        <p className="text-[#9B9CA0] truncate">Automations</p>
        <ChevronRight className="flex-shrink-0" color="#3352CC" />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              placeholder={
                isPending ? latestVariable?.variables : "Add Automation Name"
              }
              className="bg-transparent border-none h-auto outline-none text-base p-0"
            />
          ) : (
            <p className="text-[#9B9CA0]">
              {latestVariable?.variables
                ? latestVariable?.variables?.name
                : data?.data?.name}
            </p>
          )}
          {edit ? (
            <></>
          ) : (
            <span className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4" onClick={enableEdit}>
              <Pencil size={14} />
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
          All states are automatically saved
        </p>
        <div className="flex gap-x-5 flex-shrink-0">
          <p className="text-text-secondary text-sm truncate min-w-0">
            Changes Saved
          </p>
        </div>
      </div>
      <ActivateAutomationButton id={id} />
    </div>
  );
};

export default AutomationBreadcrumbs;
