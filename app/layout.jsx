import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/navbar";
import AuthProvider from "@/components/auth/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " CKR PDF AI",
  description: "Question your PDFs using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="w-full h-full pt-16 pl-0 ">{children}</div>{" "}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
