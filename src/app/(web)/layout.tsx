import type { Metadata } from "next";
import "../../app/globals.css";
import { AuthProvider, ReactQueryProvider } from "@/client/providers";
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
    <ReactQueryProvider>
      <html lang="ja">
        <body>
          <AuthProvider>
            <Header />
            {children}
            <ModalContainer />
            <ToastContainer />
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
