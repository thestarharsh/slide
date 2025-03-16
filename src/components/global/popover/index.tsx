import { JSX, ReactNode } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PopOverProps = {
    trigger: JSX.Element;
    children: ReactNode;
    className?: string;
};

const PopOver = ({ children, className, trigger } : PopOverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                className={cn("bg-[#1D1D1D] shadow-lg max-h-fit overflow-y-auto", className)}
                align="end"
                side="bottom"
            >
                {children}
            </PopoverContent>
        </Popover>
    );
};

export default PopOver;
