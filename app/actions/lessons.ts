"use server";

import { API_HOST } from "@/utils/types";
import axios from "axios";
import { File } from "megajs";

export const createLesson = async (formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
      images: formData.getAll("images"),
      description: formData.get("description"),
      grade: formData.get("grade")?.toString().toLowerCase(),
      subject: formData.get("subject")?.toString().toLowerCase(),
      tags: formData.get("tags")?.toString().trim().split(",").filter(Boolean),
    };
    console.log(payload);

    await create("/lessons", payload);
  } catch (err) {
    console.error(err);
  }
};

export const updateLesson = async (formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      grade: formData.get("grade")?.toString().toLowerCase(),
      subject: formData.get("subject")?.toString().toLowerCase(),
      tags: formData.get("tags")?.toString().trim().split(",").filter(Boolean),
    };

    const id = formData.get("id");
    console.log(payload, id);

    await axios.put(`${API_HOST}/api/lessons/${id}`, payload);
  } catch (err) {
    console.error(err);
  }
};

export const uploadImage = async (file: File) => {
  const data = new FormData();
  data.append("file", file as any);
  data.append("upload_preset", "ilmamcdn");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgvxswr30/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const fileUploaded = await res.json();
  return fileUploaded.secure_url;
};

export const getPdfFromLink = (link: string) => {
  const pdf = File.fromURL(link);
  return pdf.downloadBuffer({});
};
