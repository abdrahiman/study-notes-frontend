import { getter } from "@/app/actions/api";
import { Main } from "./+page";
import { ILesson } from "@/utils/types";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  //server stuff
  let q = "";
  for (let [a, b] of Object.entries(searchParams)) {
    if (!q) q += "?";
    else q += "&";
    q += a + "=" + b;
  }
  let lessons: ILesson[];
  // let lessons:ILesson[] = await getter("/lessons"+q);
  lessons = [
    {
      _id: "OOOO",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "الفيزياء والكيمياء",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
  ];

  return <Main lessons={lessons} />;
}
