import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./components/nav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Kholasa | Study Smart Not Hard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className="light">
      <body className="bg-premary dark:bg-black text-white dark:text-white">
        <Nav />
        <main className="mt-4 max-w-6xl w-full px-2 mx-auto pb-6">
          {children}
        </main>
      </body>
    </html>
  );
}
