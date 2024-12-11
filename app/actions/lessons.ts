"use server";

import { InputFilesToPDF } from "@/utils/pdf";
import { create, update } from "./api";

export const CreateLesson = async (formData: FormData) => {
  try {
    let payload: any = {
      title: formData.get("title"),
      images: formData.getAll("images"),
      description: formData.get("description"),
      grade: formData.get("grade"),
      subject: formData.get("subject"),
      tags: formData.get("tags"),
    };
    //process data
    if (payload.tags) {
      payload.tags = (payload.tags as string)
        .trim()
        .split(",")
        .filter((s) => s != "");
    }
    if (payload.grade && payload.subject) {
      payload.grade = payload.grade.toLowerCase();
      payload.subject = payload.subject.toLowerCase();
    }
    let imagesUrls =[];
    if(payload.images){
      for(let image of payload.images){
        let fd = new FormData();
        fd.set(file,image);
        let res= await create("/lesson/upload",fd);
        imagesUrls.push(res.url);
        console.log(image);
      }
    }
    payload.images= imagesUrls;
    console.log(payload);
    // to backend
    let r = await create("/lessons", payload);
    // console.log(r);
  } catch (err:any) {
    console.log(err);
    return {error:err.message}
  }
};
export const UpdateLesson = async(formData: FormData) => {
  try {
    let payload: any = {
      title: formData.get("title"),
      description: formData.get("description"),
      grade: formData.get("grade"),
      subject: formData.get("subject"),
      tags: formData.get("tags"),
    };
    let id = formData.get("id");
    //process data
    if (payload.tags) {
      payload.tags = (payload.tags as string)
        .trim()
        .split(",")
        .filter((s) => s != "");
    }
    if (payload.grade && payload.subject) {
      payload.grade = payload.grade.toLowerCase();
      payload.subject = payload.subject.toLowerCase();
    }
    console.log(payload, id);
    await update("/lessons/" + id, payload);
  } catch (err) {
    console.log(err);
  }
};
