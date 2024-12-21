import { ILesson } from "@/utils/types";
import { Lesson } from "./+page";
import { getter } from "@/app/actions/api";
import { redirect } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";


export default async function Page({ params }: { params: { id: string } }) {
  //server stuff
  // let lesson:ILesson = await getter("/lessons/"+params.id);
  let lesson = {
    _id: "010101",
    title: "الموجات الديناميكية",
    description: "مجموعة من التلاخيص المختارة بعناية باش تعاونك تفوق وتجيب نقاط مجموعة من التلاخيص المختارة بعناية باش تعاونك تفوق وتجيب نقاط 💯",
    grade: "تانية باك فيزياء",
    subject: "الفيزياء والكيمياء",
    images: ["/test.jpg", "/test.jpeg", "/image.jpeg", "/user.png"],
    publisher: { name: "sur" },
    tags: ["bruh"],
    createdAt: new Date(),
  };
  if (!lesson) redirect("/404");
  return <Lesson lesson={lesson} />;
}
