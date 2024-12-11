"use client";
import { ILesson } from "@/utils/types";
import { Card } from "./components/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "./components/icons/search";

export function Main({ lessons, q }: { lessons: ILesson[]; q?: any }) {
  let r = useRouter();
  let s = useSearchParams();
  return (
    <div className="w-full flex flex-col">
      <header className="w-full min-h-screen flex items-center justify-start flex-col gap-2">
        <div className="hero-image absolute left-0 top-0 w-full h-screen -z-10">
          <img src="/hero.png" className="w-full object-cover h-full" alt="" />
        </div>
        <h1 className="font-bold mt-32 max-md:text-2xl text-4xl text-center">
          ملخصات <span className="mark relative">تعتقك</span> من ساعات ديال
          المراجعة
        </h1>
        <p className="mt-4 text-slate-600 text-center max-md:text-sm">
          مجموعة من التلاخيص المختارة بعناية باش تعاونك تفوق وتجيب نقاط 💯
        </p>
        <Link href="#browse">
        <button className="px-4 py-2 rounded-lg text-white mt-4 bg-black">تصفح الملخصات</button>
        </Link>
      </header>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl mb-4 font-bold">تصفح الملخصات</h2>

        <form
          className="search max-w-2xl w-full flex justify-start items-start flex-wrap gap-2"
          method="GET"
          id="browse"
        >
          <div className="flex gap-1 max-sm:w-full">
            <input
              type="text"
              name="title"
              className="w-72 px-2 py-[6px] bg-white dark:bg-dGray100 text-md border-2  border-slate-300 dark:border-[rgb(51,51,51)] rounded-lg overflow-hidden text-black"
              placeholder="بحث عن دروس..."
              defaultValue={q?.title || ""}
            />
          </div>
          <div className="max-sm:w-full flex gap-2 flex-wrap">
            <div className="">
              <select
                name="grade"
                id=""
                defaultValue={q?.grade || ""}
                className="rounded-lg text-sm dark:bg-purple-500 bg-white border-2 border-slate-300 px-4 text-slate-600 py-2 min-w-fit"
              >
                <option value="">{q?.grade ? "الكل" : "المستوى"}</option>
                <option value="bac">Bac</option>
                <option value="tcs">Tcs</option>
                <option value="3am">3am</option>
                <option value="5am">3am</option>
              </select>
            </div>
            <div className="">
              <select
                name="subject"
                id=""
                defaultValue={q?.subject || ""}
                className="rounded-lg text-sm dark:bg-purple-500 bg-white border-2 border-slate-300 px-4 text-slate-600 py-2 min-w-fit"
              >
                <option value="">{q?.subject ? "الكل" : "المادة"}</option>
                <option value="arabic">العربية</option>
                <option value="history">الاجتماعيات</option>
                <option value="frencais">الفرنسية</option>
              </select>
            </div>
            <button className="rounded-lg text-sm dark:bg-purple-500 bg-premary px-6 text-white py-2 min-w-fit flex gap-1 items-center">
              بحث
              <SearchIcon classNames="size-4" />
            </button>
          </div>
        </form>
      </div>
      <section className="w-full h-full">
        <main className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 justify-start my-8">
          {lessons && lessons.map((l) => <Card lesson={l} key={l._id} />)}
        </main>
        <div className="w-full flex justify-center items-center">
          <button
            className="mx-auto px-4 py-2 rounded-xl text-white bg-premary text-sm bg-opacity-30"
            onClick={() => {
              if (s.has("limit")) {
                let newLim = String(parseInt(s.get("limit") || "") + 24);
                r.push(
                  "/?" +
                    s
                      .toString()
                      .replace("limit=" + s.get("limit"), "limit=" + newLim)
                );
              } else {
                r.push("/?" + s.toString() + "&limit=" + 24);
              }
            }}
          >
            عرض المزيد
          </button>
        </div>
      </section>
    </div>
  );
}
