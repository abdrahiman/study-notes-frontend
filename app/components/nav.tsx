"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloudDownloadIcon } from "./icons/download";
import { ThemeIcon } from "./icons/theme";

export function Nav() {
  let [themeDark, setTheme] = useState(false);
  useEffect(() => {
    if (!document.querySelector(":root")) return;
    if (document.querySelector(":root")?.classList.contains("dark")) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, []);
  let changeTheme = () => {
    if (!document.querySelector(":root")) return;
    if (document.querySelector(":root")?.classList.contains("dark")) {
      document.querySelector(":root")?.classList.remove("dark");
      document.querySelector(":root")?.classList.add("light");
      setTheme(false);
    } else {
      document.querySelector(":root")?.classList.remove("light");
      document.querySelector(":root")?.classList.add("dark");
      setTheme(true);
    }
  };
  return (
    <nav className="w-full max-w-6xl mx-auto py-8 px-2 flex justify-between items-center">
      <Link
        href="/"
        className="name text-xl font-bold px-6 py-2 bg-black dark:bg-premary rounded-xl text-white"
      >
        خلاصة
      </Link>
      <div className="flex gap-2 items-center">
        <button onClick={changeTheme}>
          <ThemeIcon />
        </button>
        <Link href="/profile" className="flex gap-2 items-center">
          <img src="/user.png" alt="" className="w-8 h-8 rounded-full" />
        </Link>
      </div>
    </nav>
  );
}
