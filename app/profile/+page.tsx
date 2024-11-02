"use client";

import { useState } from "react";
import { Card } from "../components/card";
import Link from "next/link";
import { IUser } from "@/utils/types";

export function Profile({user}:{user:IUser}) {
  let [savedTab, setTab] = useState(true);
  let lessons = [
    {
      _id: "00100",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "الفيزياء والكيمياء",
      lesson: ["/test.jpg"],
      publisher: "0101",
      tags: ["bruh"],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col items-center gap-4">
        <img className="rounded-full w-48 h-48 mx-auto" src={user.avatar} />
        <h3 className="text-xl font-bold" dir="auto">
          {user.name}
        </h3>
        <div className="tabs flex gap-6">
          <button
            onClick={() => setTab(true)}
            className={`px-6 py-2 bg-dGray200/40 border-b-2 ${
              savedTab ? "border-b-white" : "border-b-transparent"
            }`}
          >
            المحفوظة
          </button>
          <button
            onClick={() => setTab(false)}
            className={`px-6 py-2 bg-dGray200/40 border-b-2 ${
              !savedTab ? "border-b-white" : "border-b-transparent"
            }`}
          >
            الدروس التي نشرتها
          </button>
        </div>
      </div>
      {savedTab ? (
        <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-4">
          {lessons&& lessons.map(l=>(
            <Card lesson={l} />
          ))}
        </main>
      ) : (
        <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-4">
          <Card lesson={lessons[0]} profileMode={lessons[0].publisher==user._id} />
          <Link
            href="/profile/create"
            className="flex flex-col h-80 rounded-xl bg-wGray100 dark:bg-dGray100 shadow-md items-center text-8xl justify-center gap-2 text-black"
          >
            +
            <span className="text-sm text-center ">
              شارك ادوات الدراسة الخاصة بك <br />
              (امتحانات, تمارين, ملاحضات,ملخصات...)
            </span>
          </Link>
        </main>
      )}
    </div>
  );
}
