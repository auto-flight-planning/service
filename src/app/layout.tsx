import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
