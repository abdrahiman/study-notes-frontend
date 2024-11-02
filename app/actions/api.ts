"use server";
import axios, { type AxiosRequestConfig } from "axios";
import { API_HOST } from "@/utils/types";
// import toast from "react-hot-toast";

// let showError = (message: string) => {
//   toast.error(message);
//   return new Error(message);
// };

// let showSucess = (message: string) => {
//   toast.success(message);
// };

export let update = async (slug: string, payload: any) => {
  let res = await axios.put(API_HOST + slug, payload).catch((err) => {
    return err;
  });

  return res.data;
};

export let create = async (slug: string, payload: any) => {
  // toast.loading("loading", { id: "loading_create" });
  // try {
  let isErr = false;
  let res = await axios.post(API_HOST + slug, payload).catch((err) => {
    isErr = true;
    return err;
  });

  if (isErr) {
    // toast.remove("loading_create");
    // return showError(res.response.data.message);
  }
  // toast.remove("loading_create");

  //display success toast
  // showSucess("created successfully");
  return res.data;
  // } catch (err: any) {
  //   toast.remove("loading_create");
  //   console.log(err.message);
  //   return showError("error loading data");
  // }
};

export let remove = async (slug: string) => {
  // toast.loading("loading", { id: "loading_delete" });
  // try {
  let isErr = false;
  let res = await axios.delete(API_HOST + slug).catch((err) => {
    isErr = true;
    return err;
  });

  // if (isErr) {
  //   toast.remove("loading_delete");
  //   return showError(res.response.data.message);
  // }
  // toast.remove("loading_create");

  // toast.remove("loading_delete");
  // //display success toast
  // showSucess("deleted successfully");
  return res.data;
  // } catch (err) {
  //   toast.remove("loading_delete");
  //   return showError("error loading data");
  // }
};

export let getter = (slug: string, config?: AxiosRequestConfig<any>) => {
  return axios(API_HOST + slug, config)
    .then((res: any) => res.data)
    .catch((err) => err);
};
