import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Trigger from "@/components/global/automations/trigger";
import AutomationBreadcrumbs from "@/components/global/breadcrumbs/automation-breadcrumbs";
import { getAutomationInfo } from "@/actions/automations";
import { Warning } from "@/icons";
import { PrefetchUserAutomation } from "@/react-query/prefetch";

type AutomationIdPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const info = await getAutomationInfo(id);
  return {
    title: info?.data?.name || "Automation",
  };
}

const AutomationIdPage = async ({ params }: AutomationIdPageProps) => {
  const { id } = await params;
  const query = new QueryClient();
  await PrefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex flex-col items-center gap-y-20">
        <AutomationBreadcrumbs id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <Trigger id={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default AutomationIdPage;
