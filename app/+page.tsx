"use client";
import { ILesson } from "@/utils/types";
import { Card } from "./components/card";

export function Main({ lessons,q }: { lessons: ILesson[],q?:any }) {
  return (
    <div className="w-full flex flex-col">
      <form className="search mx-auto max-w-2xl w-full flex gap-2 flex flex-col" method="GET">
        <div className="flex gap-1">
        <input
          type="text"
          name="title"
          className="w-full px-2 py-2 bg-white dark:bg-dGray100 text-md border-2  border-black dark:border-[#333] rounded-md overflow-hidden text-black "
          placeholder="بحث عن دروس..."
          defaultValue={q?.title||""}
        />
        <button className="rounded-xl text-sm dark:bg-purple-500 bg-white border-2 border-dGray100 px-2 text-black py-1 min-w-fit">
          <span>بحث</span>
        </button>

        </div>
        <div className="w-fit mx-auto flex gap-2">
        <div className="">
        <select name="grade" id=""
          defaultValue={q?.grade||""}
          className="rounded-xl text-sm dark:bg-purple-500 bg-white border-2 border-dGray100 px-4 text-black py-2 min-w-fit">
          <option value="">{q?.grade?'الكل':"المستوى"}</option>
          <option value="bac">Bac</option>
          <option value="tcs">Tcs</option>
          <option value="3am">3am</option>
          <option value="5am">3am</option>
        </select>
        </div>
        <div className="">
          <select name="subject" id=""
          defaultValue={q?.subject||""}
          className="rounded-xl text-sm dark:bg-purple-500 bg-white border-2 border-dGray100 px-4 text-black py-2 min-w-fit">
          <option value="">{q?.subject?'الكل':"المادة"}</option>
          <option value="arabic">العربية</option>
          <option value="history">الاجتماعيات</option>
          <option value="frencais">الفرنسية</option>
        </select></div>

        </div>
      </form>
      <section className="w-full h-full">
        <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-8">
          {lessons.map((l) => (
            <Card lesson={l} key={l._id} />
          ))}
        </main>
      </section>
    </div>
  );
}
