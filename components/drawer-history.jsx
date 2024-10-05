"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import PDFButton from "./pdf-button";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getUserByEmail } from "@/db/queries/user";
import { deleteSession } from "@/db/queries/session";
import { useSession } from "next-auth/react";
import Link from "next/link";
import History from "./logos/History";
const DrawerHistory = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const deleteSession = async (id) => {
    await deleteSession(id);
    setUser((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((session) => session.$id !== id),
    }));
  };
  return (
    <Drawer
      className="text-black h-auto"
      open={isDrawerOpen}
      onOpenChange={(isOpen) => setIsDrawerOpen(isOpen)}
    >
      <DrawerTrigger>
        <Button
          className="flex gap-1 border-black border-opacity-0 border-[1px] hover:bg-black/5"
          onClick={() => setIsDrawerOpen(true)}
        >
          History
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto w-full">
        <DrawerHeader>
          <DrawerTitle>
            <div className="font-semibold text-xs flex items-center gap-1 px-1 opacity-60">
              <History />
              HISTORY
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 flex flex-col gap-1.5 border-r-[1.5px] border-black border-opacity-20">
          {user?.sessions &&
            user?.sessions?.map((session) => (
              <div
                key={session.$id}
                className="flex justify-between items-center"
              >
                <DrawerClose>
                  <Link
                    onClick={() => setIsDrawerOpen(false)}
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full h-10 flex items-center justify-start bg-transparent hover:bg-black/5 transition-all rounded-sm"
                    href={`/chat/${session.page_id}`}
                  >
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap px-1.5">
                      {session.title}
                    </div>
                  </Link>
                </DrawerClose>
                <Button
                  onClick={() => {
                    deleteSession(session.$id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
        <DrawerFooter className="w-full justify-start flex">
          <DrawerClose className="w-full justify-start flex">
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <PDFButton type="bottom" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerHistory;
