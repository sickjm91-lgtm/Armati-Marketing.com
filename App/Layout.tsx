import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArmatiMarketing.Com | AI Website Builder",
  description:
    "Build, customize, and manage professional websites with Armati Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
