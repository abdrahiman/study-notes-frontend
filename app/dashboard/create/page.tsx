"use client";

import { CreateLesson } from "@/app/actions/lessons";
import { useState } from "react";

export default function Create(){
  let [errorMsg,setError]= useState("");
  let [isPDFMode,setMode]= useState(true);
  
  return(
    <div
      className="w-full flex justify-center px-2 items-center h-full flex-col gap-4 relative"
      
    >
      <h1 className="text-2xl font-semibold mb-2">انشاء درس</h1>
      <form
        className="rounded-xl items-center max-w-sm w-full flex flex-col gap-4 h-fit"
        encType="multipart/form-data"
        action={CreateLesson}
      >
        {errorMsg &&
        (
          <p dir="auto" className="error w-full bg-red-800/40 border border-red-600 px-2 py-2 rounded-md">{errorMsg||""}</p>
        )}
        <div className="flex w-full flex gap-4">
          <label>رفع ملف الPDF</label>
          <input
            type="checkbox"
            name=""
            checked={isPDFMode}
            onChange={()=>setMode(!isPDFMode)}
            id=""
            className="accent-purple-600 w-5 h-5"
          />
        </div>
        {isPDFMode ?(
          <div className="flex flex-col w-full h-fit relative">
            <label className="">الملف</label>
            <div className="px-10 py-2 text-center rounded-xl bg-purple-800/20 border-purple-900 border-2">
            ارفع ملف PDF
            <input type="file" name="pdf" accept=".pdf" className="absolute left-0 top-0 opacity-0 w-full h-full z-10" />
            </div>
          </div>):(
        <div className="flex flex-col w-full h-fit ">
            <label className="">الملفات</label>
            <div className="px-10 py-2 text-center rounded-xl bg-purple-800/20 border-purple-900 border-2 relative">
            ارفع الصور
            <input
              type="file"
              name="images"
              multiple
              accept=".png,.jpg,.jpeg"
              className="absolute left-0 top-0 opacity-0 w-full h-full z-10" />
            </div>
            </div>)
            }
        <div className="flex flex-col w-full">
          <label className="">العنوان</label>
          <input
            type="text"
            id=""
            className="max-w-sm py-2 px-2 bg-wGray100 dark:bg-dGray200"
            name="title"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="">الوصف</label>
          <textarea
            id=""
            className="max-w-sm py-2 px-2  bg-wGray100 dark:bg-dGray200 outline-purple-600"
            name="description"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="">المستوى</label>
          <select
            name="grade"
            id=""
            className="py-2 bg-wGray100 dark:bg-dGray200 outline-purple-600 px-2"
          >
            <option value="7eme">7eme</option>
            <option value="8eme">8eme</option>
            <option value="9eme">9eme</option>
            <option value="tcs">TCS</option>
            <option value="tcl">TCL</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="">المادة</label>
          <select
            name="subject"
            id=""
            className="py-2 bg-wGray100 dark:bg-dGray200 outline-purple-600 px-2"
          >
            <option value="math">math</option>
            <option value="phisic">phisic</option>
            <option value="arabic">arabic</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="">الكلمات المفتاحية(منفصلة ب,)</label>
          <input
            type="text"
            required
            id=""
            className="max-w-sm py-2 px-2 bg-wGray100 dark:bg-dGray200 outline-purple-600"
            name="tags"
          />
        </div>
        <button className="btn w-full max-w-sm bg-purple-600 text-white py-2"
          >{false ? "نشر..." : "أنشاء"}</button>
      </form>
    </div>
  )
}