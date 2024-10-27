"use server";

export const CreateLesson = (formData:FormData)=>{ 
  console.log("START");
  try{

    let payload:any = {
      title:formData.get("title"),
      pdf:formData.get("pdf"),
      images:formData.get("images"),
    description:formData.get("description"),
    grade:formData.get("grade"),
    subject:formData.get("subject"),
    tags:formData.get("tags"),
  };
  //process data
  if(payload.tags){
    payload.tags = (payload.tags as string).trim().split(",").filter(s=>s!="");
  }
  if(payload.grade && payload.subject){
    payload.grade = payload.grade.toLowerCase();
    payload.subject = payload.subject.toLowerCase();
  }
  let IsPdf = true;
  if(payload.images){
    IsPdf = false;
    payload.pdf = null;//FILES TO PDF
  } 
  delete payload.images;
  console.log(payload);
  // to backend
}catch(err){
  console.log(err);
}
}