import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senlik - Dijital Yaşam, Ticaret ve Hizmet Platformu",
  description: "Hayatın, ticaretin ve hizmetlerin yeni merkezi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}