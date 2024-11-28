import { getter } from "@/app/actions/api";
import { Main } from "./+page";
import { ILesson } from "@/utils/types";

export default async function Page({ searchParams }: { searchParams: any }) {
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
  }
  let lessons:ILesson[] = (await getter("/lessons"+q)).lessons;


  return (
    <Main
      lessons={lessons}
      q={searchParams}
    />
  );
}
