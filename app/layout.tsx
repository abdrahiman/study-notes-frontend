import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./components/nav";

export const metadata: Metadata = {
  title: "Kholasa: hz dars dyalk wsir fi halatk",
  description: "Kholasa | Study Smart Not Hard",
};

const https = require('https');


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let noNavPages = false;
  let fullWidthPages = false;
  return (
    <html lang="ar" className="light">
      <body className="dark:bg-black text-black bg-wGray100 dark:text-white">
        {!noNavPages&& <Nav />}
        <main className={`w-full px-2 pb-6 ${fullWidthPages?"":"mt-4 max-w-6xl mx-auto"}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
