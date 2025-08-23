import type { Metadata } from "next";
import "./globals.css";
import { ModalContainer } from "@/client/components/modal";
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
      </body>
    </html>
  );
}
