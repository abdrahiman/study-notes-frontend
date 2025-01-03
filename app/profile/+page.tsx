"use client";

import { MouseEventHandler, useState } from "react";
import { Card } from "../components/card";
import Link from "next/link";
import { IUser } from "@/utils/types";
import { Edit } from "lucide-react";

export function Profile({ user }: { user: IUser }) {
  let [savedTab, setTab] = useState(true);
  let [editeMode, setEditeMode] = useState(false);
  let [userName, setUserName] = useState(user?.name || "مجهول");
  let EditeName = () => {
    // update("/users/id", { name: userName });
    setEditeMode(!editeMode);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col items-center gap-4">
        <img
          className="rounded-full w-48 h-48 mx-auto flex items-start"
          src={user.avatar}
        />
        <div className="flex gap-2">
          <h3
            className="text-2xl font-bold rounded-lg"
            dir="auto"
            onChange={(e) => setUserName((e.target as any).textContent)}
            contentEditable={user && editeMode}
          >
            {userName}
          </h3>
          <div onClick={EditeName}>
            {editeMode ? (
              <button className="bg-premary p-1 text-white rounded-lg">
                حفظ
              </button>
            ) : (
              <Edit className="size-3" />
            )}
          </div>
        </div>
        <div className="tabs flex gap-6">
          <button
            onClick={() => setTab(true)}
            className={`px-6 py-2 bg-dGray200/40 border-b-2 ${
              savedTab ? "border-b-premary" : "border-b-transparent"
            }`}
          >
            المحفوظة
          </button>
          <button
            onClick={() => setTab(false)}
            className={`px-6 py-2 bg-dGray200/40 border-b-2 ${
              !savedTab ? "border-b-premary" : "border-b-transparent"
            }`}
          >
            الدروس التي نشرتها
          </button>
        </div>
      </div>
      {savedTab ? (
        <>
          <span className="text-center mt-6">لم تقم بحفظ اي ملخص</span>
          <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-4">
            {/* {lessons && lessons.map((l) => <Card lesson={l} />)} */}
          </main>
        </>
      ) : (
        <>
          <span className="text-center mt-6">لم تقم بنشر اي ملخص</span>
          <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-4">
            {/* <Card
            lesson={lessons[0]}
            profileMode={lessons[0].publisher == user._id}
          /> */}
          </main>
        </>
      )}
    </div>
  );
}
