"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const router = useRouter();
  const handleClick = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };
  return (
    <Button
      onClick={handleClick}
      className="border-black border-opacity-10 border-[1px] hover:bg-red-100"
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
