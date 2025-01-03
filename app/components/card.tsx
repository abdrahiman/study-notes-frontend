"use client";
import { ILesson, SubjectsArColor } from "@/utils/types";
import axios from "axios";
import { DeleteIcon, Edit, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Card({
  lesson,
  profileMode,
}: {
  lesson: ILesson;
  profileMode?: boolean;
}) {
  let [deleteMode, setDelMode] = useState(false);

  const s = Object.entries(SubjectsArColor)
    .find((e) => e[0] == lesson.subject)
    ?.at(1) as { color: string; arabic: string };
  return (
    <>
      {deleteMode && (
        <div className="fixed z-50 w-screen left-0 top-0 h-screen flex justify-center items-center bg-black/30">
          <div className="popup w-full max-w-xs py-6 px-2 rounded-xl bg-white border-2 border-[#ddd] flex flex-col gap-4">
            <h2 className="text-black text-center">
              هل انت متأكد انك تريد حذف هذا العنصر؟
            </h2>
            <button
              className="rounded-md px-10 mx-auto py-2 bg-red-500"
              onClick={async () => {
                await axios.delete("/lessons/" + lesson._id);
              }}
            >
              حذف
            </button>
            <button
              className="rounded-md px-10 mx-auto py-2 bg-gray-600"
              onClick={() => setDelMode(false)}
            >
              الغاء
            </button>
          </div>
        </div>
      )}
      <div className="card flex flex-col h-96 rounded-xl bg-white dark:bg-dGray100 shadow-sm dark:text-white border-slate-100 border-2 overflow-hidden">
        <div className="image bg-gray-700 max-h-96 h-full overflow-hidden">
          <Link href={"/lesson/" + lesson._id}>
            <img
              src={lesson.images[0]}
              alt="title"
              className="w-full h-full object-center hover:scale-[1.3] transition-all max-md:object-cover"
            />
          </Link>
        </div>
        <div className="info relative h-fit min-h-fit flex flex-col gap-2 p-2">
          <Link href={"/lesson/" + lesson._id}>
            <h3 className="text-xl">{lesson.title}</h3>
          </Link>
          <div className="bottom flex gap-2 items-center">
            <div
              className={
                "span rounded-md bg-opacity-30 py-[0.1rem] px-2 text-sm"
              }
              style={{ background: s?.color + "24", color: s?.color }}
            >
              {s?.arabic || ""}
            </div>
            <p className="text-gray-600 text-sm">{lesson.grade}</p>
          </div>
          {profileMode ? (
            <>
              <button
                className="absolute left-3 top-3 bg-red-500 p-1"
                onClick={() => setDelMode(true)}
              >
                <DeleteIcon />
              </button>
              <Link
                href={"/lesson/" + lesson._id + "/update"}
                className="absolute left-10 top-3 bg-blue-500 p-1"
              >
                <Edit />
              </Link>
            </>
          ) : (
            <button
              className={"absolute left-3 top-3 bg-slate-200 rounded-md p-2"}
              onClick={() => setDelMode(true)}
            >
              <Save className="size-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
