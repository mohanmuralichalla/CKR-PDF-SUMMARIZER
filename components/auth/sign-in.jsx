"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/signin");
  };
  return (
    <Button
      onClick={handleClick}
      className="border-black border-opacity-10 border-[1px]"
    >
      Upload PDF
    </Button>
  );
};

export default SignInButton;
