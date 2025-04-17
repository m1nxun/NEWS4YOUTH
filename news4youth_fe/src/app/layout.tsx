import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
export const metadata: Metadata = {
  title: "News For Youth | 쉬운 언론",
  description: "News For Youth는 청소년을 위한 쉬운 언론입니다.",
  icons: {
    icon: "/Daeshin.png",
    shortcut: "/Daeshin.png",
  },
};
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
