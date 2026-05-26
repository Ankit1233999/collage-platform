import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Platform",
  description: "Browse and explore college details, courses, placements, and fees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
