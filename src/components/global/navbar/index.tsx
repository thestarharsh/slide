"use client";

import { usePath } from "@/hooks/use-nav";

type NavbarProps = {
  slug: string;
};

const Navbar = ({ slug }: NavbarProps) => {
  const { page } = usePath();
  return <div>Navbar</div>;
};

export default Navbar;
