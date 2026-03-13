import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel Final",
  description: "Protected admin area"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}