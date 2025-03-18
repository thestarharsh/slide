"use client";

import { Crown, User } from "lucide-react";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useQueryUser } from "@/hooks/user-queries";

import Loader from "../loader";

const ClerkAuthState = () => {
  const { data } = useQueryUser();
  const isPro = data?.data?.subscription?.plan === "PRO";

  return (
    <>
      <ClerkLoading>
        <Loader state>
          <></>
        </Loader>
      </ClerkLoading>
      <SignedOut>
        <SignInButton>
          <Button
            className="rounded-lg bg-[#252525] text-white hover:bg-[#252525]/70 flex items-center gap-x-2"
          >
            <User size={16} />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="relative">
          {isPro && (
            <Crown
              className="absolute -top-1 -left-0.5 text-yellow-500 w-3 h-3 z-50"
            />
          )}
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
};

export default ClerkAuthState;
