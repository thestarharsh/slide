import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GradientButtonProps = {
  children: React.ReactNode;
  type: "BUTTON" | "LINK";
  href?: string;
  className?: string;
};

const GradientButton = ({
  children,
  type,
  href,
  className,
}: GradientButtonProps) => {
  const gradients =
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]";

  switch (type) {
    case "BUTTON":
      return (
        <div className={gradients}>
          <Button className={cn(className, "rounded-xl")}>{children}</Button>
        </div>
      );

    case "LINK":
      return (
        <div className={gradients}>
          <Link href={href!} className={cn(className, "rounded-xl")}>
            {children}
          </Link>
        </div>
      );

    default:
      return null;
  }
};

export default GradientButton;
