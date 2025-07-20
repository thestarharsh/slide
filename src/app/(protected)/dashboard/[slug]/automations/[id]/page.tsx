import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Trigger from "@/components/global/automations/trigger";
import AutomationBreadcrumbs from "@/components/global/breadcrumbs/automation-breadcrumbs";
import ThenNode from "@/components/global/automations/then/node";
import PostNode from "@/components/global/automations/post/node";
import { getAutomationInfo } from "@/actions/automations";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import { Warning } from "@/icons";

// ✅ Next.js 15 compatible props typing - params is now a Promise
type AutomationIdPageProps = {
  params: Promise<{ id: string }>;
};

// ✅ Updated generateMetadata to await params
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const info = await getAutomationInfo(id);
  return {
    title: info?.data?.name || "Automation",
  };
}

const AutomationIdPage = async ({ params }: AutomationIdPageProps) => {
  // ✅ Await the params promise in Next.js 15
  const { id } = await params;
  const query = new QueryClient();
  await PrefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex flex-col items-center gap-y-8">
        <AutomationBreadcrumbs id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <Trigger id={id} />
        </div>
        <ThenNode id={id} />
        <PostNode id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default AutomationIdPage;
