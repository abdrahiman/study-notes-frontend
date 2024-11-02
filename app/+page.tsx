"use client";
import { ILesson } from "@/app/actions/api";
import { Card } from "./components/card";
import { useState } from "react";

export function Main({ lessons }: { lessons: ILesson[] }) {
  let [q, setQ] = useState("");
  return (
    <div className="w-full flex flex-col">
      <form className="search mx-auto max-w-2xl w-full flex gap-2">
        <input
          type="text"
          className="w-full px-2 py-2 bg-white dark:bg-dGray100 text-md border-2  border-black dark:border-[#333] rounded-md overflow-hidden text-black "
          placeholder="بحث عن دروس..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="rounded-xl text-sm dark:bg-purple-500 bg-white border-2 border-dGray100 px-2 text-black py-1 min-w-fit">
          <span>تصنيف</span>
        </button>
      </form>
      <section className="w-full h-full">
        <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-8">
          {lessons.map((l) => (
            <Card lesson={l} key={l._id} />
          ))}
        </main>
      </section>
    </div>
  );
}
