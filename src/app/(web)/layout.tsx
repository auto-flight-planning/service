import type { Metadata } from "next";
import "@/styles/globals.css";
import { ReactQueryProvider } from "./_providers";
import AuthProvider from "@/features/auth/providers/authProvider";
import { ModalContainer } from "@/features/modal";
import { ToastContainer } from "@/features/toast";
import Header from "./_widgets/header";

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
