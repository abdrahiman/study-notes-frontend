import { Lesson } from "./+page";

export default function Page({params}:{params:{id:string}}) {

  //server stuff
  
  return (
    <Lesson id={params.id}/>
  );
}
