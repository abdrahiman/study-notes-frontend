import { getter } from "@/app/actions/api";
import { Main } from "./+page";
import { ILesson } from "@/utils/types";

export default async function Page({
  searchParams,
}: {
  searchParams: any;
}) {
  //server stuff
  let q = "";
  for (let [a, b] of Object.entries(searchParams)) {
    if(!a||!b) {
      delete searchParams[a];
      continue
    };
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
      subject: "frencais",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
    {
      _id: "OOOO",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "arabic",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
    {
      _id: "OOOO",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "svt",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
    {
      _id: "OOOO",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "philo",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
    {
      _id: "O9OO",
      title: "الموجات الديناميكية",
      description: "yo yo yo yo",
      grade: "تانية باك فيزياء",
      subject: "computer_science",
      lesson: ["/test.jpg"],
      publisher: { name: "sur" },
      tags: ["bruh"],
    },
  ];

  return <Main lessons={lessons.slice(0,Math.round(Math.random()*lessons.length))} q={searchParams} />;
}
