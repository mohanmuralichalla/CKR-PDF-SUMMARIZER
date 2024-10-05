"use client";

import { signIn } from "next-auth/react";
import { options } from "app/api/auth/[...nextauth]/options";
import Index from "@/components/logos/Index";
const Dashboard = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-108 flex justify-center px-10 py-20 bg-secondary rounded-md">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="w-full items-center justify-center flex flex-col gap-2">
              <Index />
              <span className="font-semibold text-xl"> CKR PDF AI</span>
            </div>

            <span className="text-black font-normal text-sm px-1.5">
              Welcome to CKR PDF AI. Please sign in to continue.
            </span>
          </div>
          <div className="text-text py-4 gap-6 flex-col flex items-center">
            {Object.values(options.providers).map((provider) => (
              <div key={provider.id} className="w-full">
                <button
                  className="text-lg px-4 py-2 bg-secondary border-[1px] border-utility flex gap-4 font-medium w-full rounded-sm hover:bg-accent transition-all justify-center items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
