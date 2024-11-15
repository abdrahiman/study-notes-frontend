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
  let [deleteMode,setDelMode] = useState(false);
  let subjects = {
    math:{color:"#086bea",arabic:"الرياضيات"},
    svt:{color:"#22c55e",arabic:"علوم الحياة والارض"},
    pc:{color:"#a855f7",arabic:"الفيزياء والكيمياء"},
    philo:{color:"#f97316",arabic:"الفلسفة"},
    arabic:{color:"#f72516",arabic:"العربية"},
    frencais:{color:"#f43f5e",arabic:"اللغة الفرنسية"},
    english:{color:"#a852f7",arabic:"اللغة الانجلينزية"},
    history:{color:"#eab308",arabic:"الاجتماعيات"},
    islamique:{color:"#22c55e",arabic:"التربية الاسلامية"},
    computer_science:{color:"#0f0000",arabic:"علوم الحاسب"},
  }
  const s = Object.entries(subjects).find((e)=>e[0] == lesson.subject)?.at(1) as {color:string,arabic:string};
  return (
    <>
    {deleteMode &&(
<div className="fixed z-50 w-screen left-0 top-0 h-screen flex justify-center items-center bg-black/30">
  <div className="popup w-full max-w-xs py-6 px-2 rounded-xl bg-white border-2 border-[#ddd] flex flex-col gap-4">
    <h2 className="text-black text-center">هل انت متأكد انك تريد حذف هذا العنصر؟</h2>
    <button className="rounded-md px-10 mx-auto py-2 bg-red-500" onClick={()=>{
      remove("/lessons/"+lesson._id);
    }}>حذف</button>
    <button className="rounded-md px-10 mx-auto py-2 bg-gray-600" onClick={()=>setDelMode(false)}>الغاء</button>
</div>
</div>
    )}
    <div
      className="card flex flex-col h-80 rounded-xl bg-white dark:bg-dGray100 shadow-md text-black dark:text-white border-dGray100 border-2 overflow-hidden"
      >
      <div className="image bg-gray-700 h-full overflow-hidden">
        <Link
          href={"/lesson/" + lesson._id}
          >
        <img
          src={lesson.lesson[0]}
          alt="title"
          className="w-full h-full object-cover"
          />
          </Link>
      </div>
      <div className="info relative h-fit min-h-fit flex flex-col gap-2 p-2">
      <Link
          href={"/lesson/" + lesson._id}
          >
        <h3 className="text-xl">{lesson.title}</h3>
          </Link>
        <div className="bottom flex gap-2 items-center">
          <div className={"span rounded-md bg-opacity-30 py-[0.1rem] px-2 text-sm"}
          style={{background:s?.color+"24", color:s?.color}}>
            {s?.arabic || ""}
          </div>
          <p>{lesson.grade}</p>
        </div>
        {profileMode && (
          <>
            <button className="absolute left-3 top-3 bg-red-500 p-1" onClick={()=>setDelMode(true)}>D</button>
            <Link href={"/lesson/"+lesson._id+"/update"} className="absolute left-10 top-3 bg-blue-500 p-1">
              U
            </Link>
          </>
        )}
      </div>
    </div>
      </>
  );
}
