"use client";
import { CreateLesson, UpdateLesson } from "@/app/actions/lessons";
import { ILesson } from "@/utils/types";
import { InputFilesToPDF } from "@/utils/pdf";
import { useState } from "react";

export const LessonForm = ({ lesson }: { lesson?: ILesson }) => {
  let [errorMsg, setError] = useState("");
  let [isPDFMode, setMode] = useState(true);
  //<div className="w-full flex gap-4">
  //   <label>رفع ملف الPDF</label>
  //   <input
  //     type="checkbox"
  //     name=""
  //     checked={isPDFMode}
  //     onChange={() => setMode(!isPDFMode)}
  //     id=""
  //     className="accent-purple-600 w-5 h-5"
  //   />
  // </div>
  // {!lesson && isPDFMode ? (
  //   <div className="flex flex-col w-full h-fit relative">
  //     <label className="">الملف</label>
  //     <div className="px-10 py-2 text-center rounded-xl bg-purple-800/20 border-purple-900 border-2">
  //       ارفع ملف PDF
  //       <input
  //         type="file"
  //         name="pdf"
  //         accept=".pdf"
  //         className="absolute left-0 top-0 opacity-0 w-full h-full z-10"
  //       />
  //     </div>
  //   </div>
  // ) : (
  let upload=async(e:any)=>{
    let imgs = e.target.files;
    console.log(imgs);
    let pdf= await InputFilesToPDF(imgs);
    console.log(pdf);
  }
  return (
    <form
      className="rounded-xl items-center max-w-sm w-full flex flex-col gap-4 h-fit text-black"
      action={lesson ? UpdateLesson : CreateLesson}
    >
    {errorMsg && (
        <p
          dir="auto"
          className="error w-full bg-red-800/40 border border-red-600 px-2 py-2 rounded-lg"
        >
          {errorMsg || ""}
        </p>
      )}
      <input type="hidden" value={lesson?._id} name="id" />

      <div className="flex flex-col w-full h-fit ">
        <label className="">الملفات</label>
        <div className="px-10 py-2 text-center rounded-xl bg-slate-200 border-premary border-2 relative">
          ارفع الصور
          <input
            type="file"
            name="images"
            multiple
            onChange={(e)=>upload(e)}
            accept=".png,.jpg,.jpeg"
            className="absolute left-0 top-0 opacity-0 w-full h-full z-10"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">العنوان</label>
        <input
          type="text"
          id=""
          defaultValue={lesson?.title || ""}
          className="max-w-sm py-2 px-2 bg-white rounded-lg dark:bg-dGray200"
          name="title"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">الوصف</label>
        <textarea
          id=""
          defaultValue={lesson?.description || ""}
          className="max-w-sm py-2 px-2  bg-white rounded-lg dark:bg-dGray200 outline-purple-600"
          name="description"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">المستوى</label>
        <select
          name="grade"
          id=""
          defaultValue={lesson?.grade || ""}
          className="py-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600 px-2"
        >
          <option value="7eme">7eme</option>
          <option value="8eme">8eme</option>
          <option value="9eme">9eme</option>
          <option value="tcs">TCS</option>
          <option value="tcl">TCL</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">المادة</label>
        <select
          name="subject"
          defaultValue={lesson?.subject || ""}
          id=""
          className="py-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600 px-2"
        >
          <option value="math">math</option>
          <option value="phisic">phisic</option>
          <option value="arabic">arabic</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">الكلمات المفتاحية(منفصلة ب,)</label>
        <input
          type="text"
          required
          id=""
          className="max-w-sm py-2 px-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600"
          defaultValue={lesson?.tags.join(", ") || ""}
          name="tags"
        />
      </div>
      <button className="btn w-full max-w-sm bg-premary text-white py-2 rounded-lg">
        {lesson ? "تعديل" : "أنشاء"}
      </button>
    </form>
  );

};
