"use client";

import { Check } from "lucide-react";

import AutomationList from "@/components/global/automation-list";
import CreateAutomation from "@/components/global/create-automation";
import { useQueryAutomations } from "@/hooks/user-queries";

const AutomationPage = () => {
  const { data } = useQueryAutomations(); 

  const activeAutomations = data?.data?.filter((automation) => automation.active) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <AutomationList />
      </div>
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl bg-background-80 gap-y-6 p-5 border-[1px] overflow-hidden border-in-active">
          <div>
            <h2 className="text-xl">Automations</h2>
            <p className="text-text-secondary">
              Your live automations will be shown here.
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {activeAutomations.length > 0 ? (
              activeAutomations.map((automation) => (
                <div key={automation.id} className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-medium">{automation.name}</h3>
                    <p className="text-text-secondary text-sm">
                      {new Date(automation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Check />
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">No active automations found.</p>
            )}
          </div>
          <CreateAutomation />
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
