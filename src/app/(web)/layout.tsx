import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider, ReactQueryProvider } from "./_providers";
import { ModalContainer } from "@/features/modal/components";
import { ToastContainer } from "@/components/toast";
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
            <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)]">
              {children}
            </div>
            <ModalContainer />
            <ToastContainer />
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
