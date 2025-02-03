import { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";

import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import { PrefetchUserProfile } from "@/react-query/prefetch";

type LayoutProps = {
  children: ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;
  const query = new QueryClient();
  await PrefetchUserProfile(query);

  return (
    <div className="p-2">
      <Sidebar slug={slug} />
      <div
        className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
      >
        <Navbar slug={slug} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
