import { ChevronRight, Pencil } from "lucide-react";

import ActivateAutomationButton from "../../activate-automation-button";

type AutomationBreadcrumbsProps = {
  id: string;
};

const AutomationBreadcrumbs = ({ id }: AutomationBreadcrumbsProps) => {
  return (
    <div className="rounded-full w-full p-5 bg-[#18181B1A] flex items-center">
      <div className="flex items-center gap-x-1 min-w-0">
        <p className="text-[#9B9CA0] truncate">Automations</p>
        <ChevronRight className="flex-shrink-0" color="#3352CC" />
        <span className="flex gap-x-3 items-center min-w-0">
          <p className="text-[#9B9CA0]">This is automation title</p>
          <span className="cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4">
            <Pencil size={14} />
          </span>
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
