"use client";
import Loading from "./loading";
import { motion } from "framer-motion";
import { getSessionByPageId } from "@/db/queries/session";
import { getUserByEmail } from "@/db/queries/user";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import Index from "@/components/logos/Index";
import { Input } from "@/components/ui/input";
import Send from "@/components/logos/Send";
import { getPDFContent, askOllama } from "@/db/queries/local";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = ({ params }) => {
  const [session, setSession] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getSessionByPageId(params.page_id).then((session) => {
      setSession(session);
      setIsMounted(true);
    });
  }, [params.page_id]);

  const { data: sessionAuth, status } = useSession();
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);
  useEffect(() => {
    if (!email) return;
    getUserByEmail(email).then((user) => {
      setImage(user?.image);
    });
  }, [email]);
  useEffect(() => {
    if (sessionAuth) {
      setEmail(sessionAuth.user.email);
      setInitials(
        sessionAuth.user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
      );
    }
  }, [sessionAuth]);
  const fetchPDFContent = async () => {
    const text = await getPDFContent(session?.pdf_url);
    setPdfContent(text);
  };

  useEffect(() => {
    if (!session) return;
    fetchPDFContent();
  }, [session]);

  const fetchResponse = async () => {
    setWaiting(true);
    console.log("fetching response");
    console.log(question);
    const res = await askOllama(question, pdfContent);
    setAnswer(res);
    // on getting answer add question and answer to userData
    setUserData([...userData, { question, answer: res }]);
    setWaiting(false);
    setQuestion("");
    setAnswer("");
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="px-2 py-2 w-full h-full ">
      {/* {pdfContent && (
        <div className="absolute right-0 transform px-2 animate-blink">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        </div>
      )} */}

      {isMounted && session && session.users && pdfContent && (
        <div className="w-full h-full">
          <div key={session.users.$id} className="w-full h-full">
            {session.users.email === email ? (
              <div className="p-4 w-full h-full flex flex-col justify-between">
                <div className="w-full h-auto flex flex-col gap-6 px-2 overflow-y-auto">
                  {userData.map((data, index) => (
                    <div
                      key={index}
                      className="w-full h-auto rounded-md flex flex-col gap-2"
                    >
                      <motion.div
                        className="w-full h-1/2 py-2 px-2 rounded-md flex items-center gap-3"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Avatar className="w-8 h-8 rounded-full object-cover">
                          <AvatarImage src={image} />
                          <AvatarFallback className="bg-black/10 rounded-full">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="">{data.question}</span>
                      </motion.div>
                      <motion.div
                        className="w-full h-auto py-2 bg-black/5 px-2 rounded-md flex items-center gap-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                      >
                        <div className="w-8 h-full flex items-start pt-1">
                          <div className="w-8 h-8 rounded-full object-cover bg-black/10 flex items-center justify-center p-1">
                            <Index className="w-6 h-6" />
                          </div>
                        </div>

                        <span className="px-1">{data.answer}</span>
                      </motion.div>
                    </div>
                  ))}

                  {userData.length === 0 && (
                    <div className="w-full h-auto flex flex-col gap-4">
                      <span className="text-4xl font-bold">Ask a Question</span>
                      <p>
                        Ask a question and get an answer from the document
                        uploaded
                      </p>
                    </div>
                  )}
                  {waiting && (
                    <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
                      <span class="sr-only">Loading...</span>
                      <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div class="h-2 w-2 bg-black rounded-full animate-bounce"></div>
                    </div>
                  )}

                  <div className="w-full py-6 bg-red-400 opacity-0">spacer</div>
                </div>
                <div className="py-16w-full h-14 bg-black/5 rounded-md flex px-4 py-2">
                  <div className="w-full h-full">
                    <Input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !waiting &&
                          question.trim() !== ""
                        ) {
                          fetchResponse();
                        }
                      }}
                      className={`w-full h-full bg-transparent border-none focus:ring-0 outline-none ${
                        waiting ? "opacity-50" : ""
                      }`}
                      placeholder="Type your question"
                      disabled={waiting}
                    />
                  </div>
                  <Button
                    className={`h-full aspect-square bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center rounded-lg p-0 ${
                      waiting ? "opacity-50" : ""
                    }`}
                    onClick={fetchResponse}
                    disabled={waiting}
                  >
                    <Send className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-4">
                <span className="text-4xl font-bold">Access Denied</span>
                <p>The chat you are trying to access does not belong to you</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
