"use server";

import { InputFilesToPDF } from "@/utils/pdf";
import { create, update } from "./api";

export const CreateLesson = async (formData: FormData) => {
  try {
    let payload: any = {
      title: formData.get("title"),
      pdf: formData.get("pdf"),
      images: formData.get("images"),
      description: formData.get("description"),
      grade: formData.get("grade"),
      subject: formData.get("subject"),
      tags: formData.get("tags"),
    };
    // //process data
    // if (payload.tags) {
    //   payload.tags = (payload.tags as string)
    //     .trim()
    //     .split(",")
    //     .filter((s) => s != "");
    // }
    // if (payload.grade && payload.subject) {
    //   payload.grade = payload.grade.toLowerCase();
    //   payload.subject = payload.subject.toLowerCase();
    // }
    console.log(payload);
    if (payload.images) {
      //FILES TO PDF
      payload.pdf = InputFilesToPDF(payload.images);
    }
    let fd = new FormData();
    fd.set("file", payload.pdf);
    let urls = await create("lessons/upload", fd);
    delete payload.pdf;

    payload.images = urls;
    // to backend
    // let r = await create("/lessons", payload);
    // console.log(r);
  } catch (err) {
    console.log(err);
  }
};
export const UpdateLesson = (formData: FormData) => {
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
    update("/lessons/" + id, payload);
  } catch (err) {
    console.log(err);
  }
};
