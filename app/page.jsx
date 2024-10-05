"use client";
import { useState, useEffect } from "react";
import { getUserByEmail } from "@/db/queries/user";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (email) {
      getUserByEmail(email).then((user) => {
        setUser(user);
        setIsMounted(true);
      });
    }
  }, [email]);

  return (
    <div className="py-2 px-4 w-full h-full items-center flex justify-center">
      <div className="max-w-1280 max-h-1280 w-full h-full items-center flex justify-center">
        <h1 className="py-8 transition-all px-4 text-center font-extrabold text-transparent text-4xl sm:text-7xl bg-clip-text bg-gradient-to-r from-slate-500 to-slate-800">
          Summarize PDFs
        </h1>
      </div>
    </div>
  );
};

export default Page;
