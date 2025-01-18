"use client";

import Image from "next/image";

import { HelpDuoToneWhite } from "@/icons";
import { usePath } from "@/hooks/use-nav";

import { Separator } from "@/components/ui/separator";

import Items from "./items";
import UpgradeCard from "./upgrade";
import ClerkAuthState from "../clerk-auth-state";
import { SubscriptionPlan } from "../subscription-plan";

type SidebarProps = {
  slug: string;
};

const Sidebar = ({ slug }: SidebarProps) => {
  const { page } = usePath();

  return (
    <div className="w-[250px] border-[1px] radial fixed left-0 lg:inline-block border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD] hidden bottom-0 top-0 m-3 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-y-2 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl overflow-y-auto">
        <div className="flex gap-x-2 items-center justify-center p-4">
          <Image src={"/slide.png"} width={168} height={68} alt="Logo" />
        </div>
        <div className="flex flex-col py-2">
          <Items page={page} slug={slug} />
        </div>
        <div className="px-16">
            <Separator 
                orientation="horizontal"
                className="bg-[#5c5c5c]"
            />
        </div>
        <div className="px-3 flex flex-col gap-y-5 mt-0">
            <div className="flex gap-x-2">
                <ClerkAuthState />
                <p className="text-[#9b9ca0]">Profile</p>
            </div>
            <div className="flex gap-x-3">
                <HelpDuoToneWhite />
                <p className="text-[#9b9ca0]">Help</p>
            </div>
        </div>
        <SubscriptionPlan type={"FREE"}>
          <div className="flex flex-1 flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  );
};

export default Sidebar;
