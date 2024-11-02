"use client";
import { ILesson } from "@/utils/types";
import Link from "next/link";
import { useState } from "react";
import { remove } from "../actions/api";

export function Card({
  lesson,
  profileMode,
}: {
  lesson: ILesson;
  profileMode?: boolean;
}) {
  let [deleteMode,setDelMode] = useState(true);
  return (
    <>
    {deleteMode &&(
<div className="fixed z-50 w-screen left-0 top-0 h-screen flex justify-center items-center bg-black/30">
  <div className="popup w-full max-w-xs py-6 px-2 rounded-xl bg-white border-2 border-[#ddd] flex flex-col gap-4">
    <h2 className="text-black text-center">هل انت متأكد انك تريد حذف هذا العنصر</h2>
    <button className="rounded-md px-10 mx-auto py-2 bg-red-500" onClick={()=>{
      remove("/lessons/"+lesson._id);
    }}>حذف</button>
    <button className="rounded-md px-10 mx-auto py-2 bg-gray-600" onClick={()=>setDelMode(false)}>الغاء</button>
</div>
</div>
    )}
    <Link
      href={"/lesson/" + lesson._id}
      className="card flex flex-col h-80 rounded-xl bg-white dark:bg-dGray100 shadow-md text-black dark:text-white border-dGray100 border-2 overflow-hidden"
    >
      <div className="image bg-gray-700 h-full overflow-hidden">
        <img
          // src="/api/image/10104751231_ktvywd.jpg"
          src={lesson.lesson[0]}
          alt="title"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="info relative h-fit min-h-fit flex flex-col gap-2 p-2">
        <h3 className="text-xl">{lesson.title}</h3>
        <div className="bottom flex gap-2 items-center">
          <div className="span rounded-md bg-red-500/30 py-[0.1rem] text-red-600 px-2 text-sm">
            {lesson.subject}
          </div>
          <p>{lesson.grade}</p>
        </div>
        {profileMode && (
          <>
            <button className="absolute left-3 top-3 bg-red-500 p-1">D</button>
            <Link href={"/lesson/"+lesson._id+"/update"} className="absolute left-10 top-3 bg-blue-500 p-1">
              U
            </Link>
          </>
        )}
      </div>
    </Link>
      </>
  );
}
