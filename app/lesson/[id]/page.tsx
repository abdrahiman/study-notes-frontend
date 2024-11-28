import { ILesson } from "@/utils/types";
import { Lesson } from "./+page";
import { getter } from "@/app/actions/api";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  //server stuff
  let lesson:ILesson = await getter("/lessons/"+params.id);
  // let lesson = {
  //   _id: "010101",
  //   title: "الموجات الديناميكية",
  //   description: "yo yo yo yo",
  //   grade: "تانية باك فيزياء",
  //   subject: "الفيزياء والكيمياء",
  //   images: ["/test.jpg", "/test.jpeg", "/image.jpeg", "/user.png"],
  //   publisher: { name: "sur" },
  //   tags: ["bruh"],
  // };
  if(!lesson) redirect("/404");
  return <Lesson lesson={lesson} />;
}
