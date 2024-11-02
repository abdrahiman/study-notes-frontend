"use client";
import { CloudDownloadIcon } from "@/app/components/icons/download";
import { LeftIcon } from "@/app/components/icons/left";
import { RightIcon } from "@/app/components/icons/right";
import { SaveIcon } from "@/app/components/icons/save";
import { UrlsToPDF } from "@/utils/pdf";
import Link from "next/link";
import { useState } from "react";
import { ILesson } from "@/utils/types";

export function Lesson({ lesson }: { lesson: ILesson }) {
  let [ImageFull, setImageMode] = useState(false);
  let [imgIndex, setImgIndex] = useState(0);
  let [isNav, setShowNav] = useState(false);

  let downloadPdf = async () => {
    let pdfUrl = await UrlsToPDF(["/test.jpg", "/user.png"]);
    let a = document.createElement("a");
    a.href = pdfUrl;
    a.download = lesson.title + ".pdf";
    a.click();
  };
  let downloadImg = () => {
    let a = document.createElement("a");
    a.href = lesson.lesson[imgIndex];
    a.download = lesson.title + imgIndex + 1;
    a.click();
  };
  return (
    <div className="w-full">
      <Link className="back underline h-12" href="/" target="_top">
        رجوع
      </Link>
      <div className="mx-auto flex items-start gap-4 w-full max-md:flex-col-reverse">
        <div className="info max-w-sm w-full flex gap-4 flex-col">
          <h1 className="text-2xl font-bold capitalize">{lesson.title}</h1>
          <div className="flex w-full gap-4">
            <span className="font-semibold">المستوى:</span>
            <span className="rounded-md bg-gray-100/30 py-[0.1rem] text-white px-2">
              {lesson.grade}
            </span>
          </div>
          <div className="flex w-full gap-4">
            <span className="font-semibold">المادة:</span>
            <span className="rounded-md bg-gray-100/30 py-[0.1rem] text-white px-2">
              {lesson.subject}
            </span>
          </div>
          <div className="flex w-full gap-4">
            <span className="font-semibold">السنة:</span>
            <span className="rounded-md bg-gray-100/30 py-[0.1rem] text-white px-2">
              {new Date(Date.now()).getFullYear()}
            </span>
          </div>
          <div className="left flex gap-3 pt-2">
            <button
              onClick={downloadPdf}
              className="rounded-xl text-xl dark:bg-purple-500 bg-gray-50 border-2 border-black px-10 text-black py-2 flex gap-2 min-w-fit items-center"
            >
              <CloudDownloadIcon />
              <span>{false ? "جاري التحميل..." : "تحميل"}</span>
            </button>
            <button className="rounded-xl text-xl dark:bg-purple-500 bg-gray-50 border-2 border-black px-3 text-black py-2">
              <SaveIcon />
            </button>
          </div>
        </div>
        <aside
          className="pdf flex flex-col gap-2 w-full items-center rounded-xl relative max-w-5xl max-h-[calc(100vh-10rem)] max-md:max-h-[calc(100vh-20rem)] h-[calc(100vh-10rem)]"
          onMouseOver={() => setShowNav(true)}
          onMouseLeave={() => setShowNav(false)}
        >
          {isNav && (
            <div className="nav py-1 h-10 z-20 bg-black bg-opacity-40 backdrop-blur-sm px-4 max-w-fit rounded-full flex gap-2 items-center text-black absolute bottom-8 max-md:bottom-4 transition-all max-md:scale-80">
              <button
                className="p-1 rounded-full h-fit bg-white bg-opacity-90"
                onClick={() =>
                  imgIndex + 1 < lesson.lesson.length
                    ? setImgIndex(imgIndex + 1)
                    : false
                }
              >
                <LeftIcon />
              </button>
              <button
                onClick={downloadImg}
                className="bg-gray-50 text-xs p-1 rounded-xl bg-opacity-90"
              >
                <CloudDownloadIcon />
              </button>
              <div className="flex min-w-fit items-center gap-2 pr-2 text-white">
                {imgIndex + 1 + " من " + lesson.lesson.length}
              </div>

              <button
                className="p-1 rounded-full h-fit bg-white bg-opacity-90"
                onClick={() =>
                  imgIndex > 0 ? setImgIndex(imgIndex - 1) : false
                }
              >
                <RightIcon />
              </button>
            </div>
          )}
          <div
            className="reader min-h-full w-full overflow-y-auto bg-gray-50 dark:bg-dGray200 border-2 border-[#333] rounded-xl flex items-center flex-col justify-start cursor-zoom-in"
            onClick={() => setImageMode(!ImageFull)}
          >
            <img
              src={lesson.lesson[imgIndex]}
              alt={"title"}
              className={`w-full h-full relative ${
                ImageFull
                  ? "min-h-fit object-cover z-10 "
                  : "object-contain h-full"
              }`}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
