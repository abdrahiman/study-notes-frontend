import { LessonForm } from "@/app/components/form";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  // let lesson:ILesson = await getter("/lessons/"+id);

  let lesson = {
    _id: "010101",
    title: "الموجات الديناميكية",
    description: "yo yo yo yo",
    grade: "tcl",
    subject: "arabic",
    lesson: ["/test.jpg", "/user.png"],
    publisher: { name: "sur" },
    tags: ["bruh","so"],
  };
  if(!lesson) redirect("/404");

  return(
    <div
      className="w-full flex justify-center px-2 items-center h-full flex-col relative">
      <h1 className="text-2xl font-semibold mb-5">تعديل درس</h1>
      <LessonForm lesson={lesson}/>
    </div>
  )
}