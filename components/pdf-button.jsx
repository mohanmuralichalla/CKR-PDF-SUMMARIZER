import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createSession } from "@/db/queries/session";
import { Button } from "@/components/ui/button";
import PDFUpload from "@/components/pdf-uploader";
import Sparkles from "./logos/Sparkles";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PDFButton = ({ userID, type = "top" }) => {
  const router = useRouter();
  const [pdf, setPdf] = useState(null);
  const [user, setUser] = useState(userID);
  const [isOpen, setIsOpen] = useState(false);
  function generateSessionId() {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  function getCurrentDateTime() {
    const date = new Date();
    return date.toISOString();
  }
  useEffect(() => {
    setUser(userID);
  }, "userID");

  async function handleClick() {
    if (!pdf) {
      alert("Please upload a PDF");
      return;
    }
    if (!user) {
      alert("User not found");
      return;
    }
    const sessionId = generateSessionId().toString();

    const date = getCurrentDateTime();
    setIsOpen(false);

    await createSession(user, date, pdf, sessionId);
    router.push(`/chat/${sessionId}`);

    setPdf(null);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger className="h-10 px-4 py-2 text-sm font-medium rounded-md border-black border-opacity-10 border-[1px] bg-black bg-opacity-0 hover:bg-opacity-[7.5%]">
        Upload PDF
      </DialogTrigger>
      <DialogContent
        className={`absolute w-auto ${
          type === "top" ? "top-1/2" : "top-3/4"
        } left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col items-center justify-center px-8 py-6`}
      >
        <DialogHeader className="mb-6">
          <DialogTitle>Upload PDF</DialogTitle>
          <DialogDescription>Upload a PDF to get started</DialogDescription>
        </DialogHeader>
        {/* if pdf then render viewport with pdf else pdfupload */}
        {pdf ? (
          <Link
            className="w-1/2 h-3/4 border-black border-opacity-10 border-[1px] rounded-md relative flex flex-col gap-2"
            href={pdf}
            target="_blank"
          >
            <iframe src={pdf} className=" w-full h-full" title="PDF"></iframe>
            <span className="w-full flex items-center justify-center font-medium bg-black bg-opacity-5 hover:bg-opacity-10 transition-all rounded-sm">
              view pdf
            </span>
          </Link>
        ) : (
          <PDFUpload setPDF={setPdf} />
        )}
        <Button
          onClick={handleClick}
          disabled={!pdf}
          className="mt-4 text-white bg-gradient-to-r from-slate-900 to-slate-700 flex gap-2 font-semibold disabled:cursor-not-allowed disabled:opacity-75"
        >
          <Sparkles className="w-6 h-6 mr-2" />
          Ask AI
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PDFButton;
