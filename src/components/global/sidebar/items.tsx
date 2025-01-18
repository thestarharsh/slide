import Link from "next/link";

import { SIDEBAR_MENU } from "@/constants/menu";
import { cn } from "@/lib/utils";

type ItemsProps = {
    page: string;
    slug: string;
};

const Items = ({ page, slug }: ItemsProps) => {
    return (
        SIDEBAR_MENU.map((item) => (
            <Link 
                key={item.id}
                href={`/dashboard/${slug}/${item.label === "home" ? `/` : item.label}`}
                className={cn(
                    "capitalize flex gap-x-2 rounded-full p-3",
                    page === item.label && "bg-[#171515] border-2 border-gray-600",
                    page === slug && item.label === "home" ? "bg-[#171717] border-2 border-gray-600" : "text-[#9a9b9f]"
                )}
            >
                {item.icon}
                {item.label}
            </Link>
        ))
    );
};

export default Items;
