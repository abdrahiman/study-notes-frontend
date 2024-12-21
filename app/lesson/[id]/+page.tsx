"use client";
import { CloudDownloadIcon } from "@/app/components/icons/download";
import { SaveIcon } from "@/app/components/icons/save";
import { UrlsToPDF } from "@/utils/pdf";
import { useState } from "react";
import { ILesson } from "@/utils/types";
import { Preview } from "@/app/components/preview";

export function Lesson({ lesson }: { lesson: ILesson }) {
  let [imgIndex, setImgIndex] = useState(0);

  let downloadPdf = async () => {
    let pdfUrl = await UrlsToPDF(["/test.jpg", "/user.png"]);
    let a = document.createElement("a");
    a.href = pdfUrl;
    a.download = lesson.title + ".pdf";
    a.click();
  };
  let downloadImg = () => {
    let a = document.createElement("a");
    a.href = lesson.images[imgIndex];
    a.download = lesson.title + imgIndex + 1;
    a.click();
  };
  return (
    <div className="w-full">
      <div className="mx-auto flex items-start gap-4 w-full max-md:flex-col-reverse">
        <div className="info max-w-sm w-full flex gap-4 flex-col">
          <h1 className="text-2xl font-bold capitalize">{lesson.title}</h1>
          <p className="mb-4">{lesson.description}</p>
          <div className="flex w-full gap-4">
            <span className="font-semibold">المستوى:</span>
            <span className="rounded-md bg-blue-500/10 py-[0.1rem] text-black px-2">
              {lesson.grade}
            </span>
          </div>
          <div className="flex w-full gap-4">
            <span className="font-semibold">المادة:</span>
            <span className="rounded-md bg-blue-500/10 py-[0.1rem] text-black px-2">
              {lesson.subject}
            </span>
          </div>
          <div className="flex w-full gap-4">
            <span className="font-semibold">السنة:</span>
            <span className="rounded-md bg-blue-500/10 py-[0.1rem] text-black px-2">
              {new Date(lesson.createdAt).getFullYear()}
            </span>
          </div>
          <div className="left flex gap-3 pt-2">
            <button
              onClick={downloadPdf}
              className="rounded-xl text-xl dark:bg-purple-500 bg-premary px-10 text-white py-2 flex gap-2 min-w-fit items-center"
            >
              <CloudDownloadIcon />
              <span>{false ? "جاري التحميل..." : "تحميل"}</span>
            </button>
            <button className="rounded-xl text-xl dark:bg-purple-500 bg-premary px-3 text-white py-2">
              <SaveIcon />
            </button>
          </div>
        </div>
        <aside className="pdf flex flex-col gap-2 w-full items-center relative max-w-5xl max-h-[calc(100vh-10rem)] max-md:max-h-[calc(100vh-20rem)] overflow-hidden h-[calc(100vh-10rem)] rounded-lg">
          <Preview images={lesson.images} />
        </aside>
      </div>
      <h3 className="text-center font-bold text-3xl mt-12 mb-2">
        ملخاصات اقدر تعجبك
      </h3>
      <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-4">
        {/* {lessons && lessons.map((l) => <Card lesson={l} />)} */}
      </main>
    </div>
  );
}
