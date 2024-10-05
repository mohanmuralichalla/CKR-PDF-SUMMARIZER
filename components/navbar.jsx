"use client";
import Link from "next/link";
import React from "react";
import SignInButton from "./auth/sign-in";
import PDFButton from "./pdf-button";
import DrawerHistory from "./drawer-history";
import Index from "./logos/Index";
import SignOutButton from "./auth/sign-out";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getUserByEmail } from "@/db/queries/user";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getSessionByPageId } from "@/db/queries/session";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userID, setUserID] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname().split("/")[2];
  const [email, setEmail] = useState(null);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    if (session) {
      setEmail(session?.user.email);
    }
  }, [session]);
  useEffect(() => {
    if (email) {
      getUserByEmail(email).then((user) => {
        setUserID(user?.$id);
        setIsMounted(true);
      });
    }
  }, [email]);

  useEffect(() => {
    if (pathname) {
      getSessionByPageId(pathname).then((session) => {
        setPdf(session?.pdf_url);
      });
    }
  }, [pathname]);

  return (
    <div className="z-10 bg-white absolute flex gap-5 h-16 items-center w-full justify-between py-1 px-4 shadow-sm border-black border-opacity-10 border-b-[1px]">
      <Link
        href="/"
        className="bg-black bg-opacity-0 hover:bg-opacity-5 transition-all p-2 rounded-sm font-semibold flex gap-2 items-center h-10 w-36 text-black text-md"
      >
        <Index />
        CKR PDF AI
      </Link>
      <div className="w-1/2 flex justify-end h-full items-center">
        {session ? (
          <div className="flex gap-4 h-full items-center">
            <DrawerHistory />
            {/* if pathname is not empty render  */}{" "}
            {pathname ? (
              <div className="">
                <a
                  href={pdf}
                  target="_blank"
                  className="cursor-pointer h-10 px-4 py-2 text-sm font-medium rounded-md border-black border-opacity-10 border-[1px] bg-black bg-opacity-0 hover:bg-opacity-[7.5%]"
                >
                  View PDF
                </a>
              </div>
            ) : (
              <PDFButton userID={userID} />
            )}
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
