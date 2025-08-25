import type { Metadata } from "next";
import "../../app/globals.css";
import { ModalContainer } from "@/client/components/modal";
import { ToastContainer } from "@/client/components/toast";
import { Header } from "./_components";

export const metadata: Metadata = {
  title: "運航日程企画システム",
  description: "航空会社の運航日程を自動企画するシステムです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <ModalContainer />
        <ToastContainer />
      </body>
    </html>
  );
}
