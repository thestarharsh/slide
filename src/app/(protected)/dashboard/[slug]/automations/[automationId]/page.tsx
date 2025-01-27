import Trigger from "@/components/global/automations/trigger";
import AutomationBreadcrumbs from "@/components/global/breadcrumbs/automation-breadcrumbs";
import { Warning } from "@/icons";

type AutomationIdPageProps = {
  params: { id: string };
};

const AutomationIdPage = ({ params }: AutomationIdPageProps) => {
  return (
    <div className=" flex flex-col items-center gap-y-20">
      <AutomationBreadcrumbs id={params.id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
        <div className="flex gap-x-2">
          <Warning />
          When...
        </div>
        <Trigger id={params.id} />
      </div>
    </div>
  );
};

export default AutomationIdPage;
