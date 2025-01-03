import { ILesson } from "@/utils/types";
import { redirect } from "next/navigation";
import Lesson from "@/app/api/lessons/lesson";

export default async function Page({ params }: { params: { id: string } }) {
  //get from database
  const lesson = await Lesson.findById(params.id);
  if (!lesson || lesson.isPrivate) redirect("/404");
  return <Lesson lesson={lesson} />;
}
