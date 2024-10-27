"use client";
import { LeftIcon } from "@/app/components/icons/left";
import { RightIcon } from "@/app/components/icons/right";
import Link from "next/link";
import { useState } from "react";

export function Lesson({id}:{id:string}){
  let [ImageFull,setImageMode] = useState(false);
  let [isNav,setShowNav] = useState(false);

  let downloadPdf = ()=>{
    console.log("downloadPdf")
  }
  return (
      <div className="page w-full h-full py-2 px-2 max-w-6xl mx-auto">
        <Link className="back underline -mt-10 h-32" href='/'>رجوع</Link>
<div className="mx-auto flex items-start gap-4 w-full max-md:flex-col-reverse">
  <div className="info max-w-sm w-full flex gap-4 flex-col">
    <h1 className="text-2xl font-bold capitalize">{"الموجات الديناميكية"}</h1>
    <p className="my-2">المستوى: تانية باك فيزياء</p>
    <div className="flex w-full gap-4">
      <span className="">السنة:</span>
      <span className="">{new Date(Date.now()).getFullYear()}</span>
    </div>
    <div className="flex w-full gap-4">
      <span className="">المادة:</span>
      <span className="">{"الفيزياء"}</span>
    </div>
    <div className="left">
      <button onClick={downloadPdf} className="rounded-xl text-xl bg-purple-500 px-8 py-2">
        <span>{false ? "جاري التحميل..." : "تحميل"}</span>
      </button>
    </div>
  </div>
  <aside className="pdf flex flex-col gap-2 w-full items-center rounded-xl relative max-w-5xl max-h-[calc(100vh-10rem)] max-md:max-h-[calc(100vh-20rem)] h-[calc(100vh-10rem)]" onMouseOver={()=>setShowNav(true)} onMouseLeave={()=>setShowNav(false)}>
    {isNav && (
      <div
      className="nav py-1 h-10 z-20 text-black bg-black bg-opacity-40 backdrop-blur-sm px-4 max-w-fit rounded-full flex gap-2 items-center text-white absolute bottom-8 max-md:bottom-4 transition-all max-md:scale-80"
    >
      <button className="p-1 rounded-full h-fit bg-black bg-opacity-70 backdrop-blur-sm">
        <LeftIcon/>
      </button>
      <div className="flex min-w-fit items-center gap-2 pr-2">
        { 1 + " من " + 12}
      </div>

      <button className="p-1 rounded-full h-fit bg-black bg-opacity-70 backdrop-blur-sm">
          <RightIcon/>
        </button>
    </div>
    )}
    <div className="reader h-full w-full overflow-auto bg-wGray200 dark:bg-dGray200 border-2 border-[#333] rounded-xl flex items-center flex-col justify-start cursor-zoom-in" 
      onClick={()=>setImageMode(!ImageFull)}
    >
     <img
        src={"/test.jpg"}
        alt={"title"}
        className={`w-full h-full relative ${ImageFull?"min-h-fit object-cover z-10 ":"object-contain h-full"}`}
      />
      </div>
  </aside>
</div>
</div>
  )
}