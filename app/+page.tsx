"use client";
import { Card } from "./components/card";
import { useState } from "react";


export function Main() {
  let [q,setQ] = useState("");
    return (
      <main className="mt-10 max-w-6xl w-full px-2 mx-auto">
        <form className="search mx-auto max-w-2xl w-full rounded-md overflow-hidden border-2 border-[#333]">
          <input type="text" className="w-full px-2 py-2 bg-wGray100 dark:bg-dGray100 text-md" placeholder="بحث عن دروس..." value={q} onChange={(e)=>setQ(e.target.value)} />
        </form>
        <section className="w-full h-full">
  <main
    className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-8"
  >
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
  </main>
      </section>
      </main>
    )
}