import { getter } from "@/app/actions/api";
import { Main } from "./+page";
import { ILesson } from "@/utils/types";

export default async function Page(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  //server stuff
  let q = "";
  for (let [a, b] of Object.entries(searchParams)) {
    if (!a || !b) {
      delete searchParams[a];
      continue;
    }
    if (!q) q += "?";
    else q += "&";
    q += a + "=" + b;
  };
  let lessons:ILesson[] = (await getter("/lessons"+q)).lessons;
  console.log(lessons);
  //let lessons: ILesson[] = [
    //{
      //title: "درس الكائنات الذرية",
  //    _id: "776",
    //  description: "هي مجموع من بلا بلا بلا بلا بلا",
      //createdAt: new Date(),
    //  grade: "الجامعة",
    //  images: ["/test.jpg"],
    //  publisher: "d",
    //  subject: "math",
    //  tags: ["سقوط"],
    //},
  //];

  return <Main lessons={lessons} q={searchParams} />;
}
