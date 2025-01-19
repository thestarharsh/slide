"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";

import { PAGE_BREAD_CRUMBS } from "@/constants/pages";
import { usePath } from "@/hooks/use-nav";
import { HelpDuoToneWhite } from "@/icons";

import { Separator } from "@/components/ui/separator";

import ClerkAuthState from "../clerk-auth-state";
import Sheet from "../sheet";
import CreateAutomation from "../create-automation";
import Items from "../sidebar/items";
import UpgradeCard from "../sidebar/upgrade";
import { SubscriptionPlan } from "../subscription-plan";

type NavbarProps = {
  slug: string;
};

const Navbar = ({ slug }: NavbarProps) => {
  const { page } = usePath();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page === slug;

  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex flex-1 items-center gap-x-2">
            <Sheet trigger={<Menu />} className="lg:hidden" side={"left"}>
              <div className="flex flex-col gap-y-2 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl overflow-y-auto">
                <div className="flex gap-x-2 items-center justify-center p-4">
                  <Image
                    src={"/slide.png"}
                    width={168}
                    height={68}
                    alt="Logo"
                  />
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
            </Sheet>
          </span>
          <Search className="mt-2.5"/>
          <CreateAutomation />
        </div>
      </div>
    )
  );
};

export default Navbar;
