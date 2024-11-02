import { ILesson } from "@/utils/types";
import { Lesson } from "./+page";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  //server stuff
  let lesson: ILesson;
  // let lesson:ILesson = await getter("/lessons/"+id);
  lesson = {
    _id: "010101",
    title: "الموجات الديناميكية",
    description: "yo yo yo yo",
    grade: "تانية باك فيزياء",
    subject: "الفيزياء والكيمياء",
    lesson: ["/test.jpg", "/user.png"],
    publisher: { name: "sur" },
    tags: ["bruh"],
  };
  // if(!lesson) redirect("/404");
  return <Lesson lesson={lesson} />;
}
