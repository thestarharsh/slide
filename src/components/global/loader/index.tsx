import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import Spinner from "./spinner";

type LoaderProps = {
  state: boolean;
  children: ReactNode;
  className?: string;
  color?: string;
};

const Loader = ({ state, children, className, color }: LoaderProps) => {
  return state ? (
    <div>
      <div className={cn(className)}>
        <Spinner color={color} />
      </div>
    </div>
  ) : (
    children
  );
};

export default Loader;
