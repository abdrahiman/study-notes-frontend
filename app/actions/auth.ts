"use server";

import { cookies } from "next/headers";
import { create } from "./api";

export let LoginAction = async (formData: FormData) => {
  console.log("Login");
  try {
    let crud = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    let data = await create("auth/login", crud);
    let token = null;
    if (data.access_token) {
      token = data.access_token; 
      (await cookies()).set("access_token", token);
      return {state:{message:"logged in"}};
    }
  } catch (err: any) {
    console.log(err.message);
    // return {state:{message:err.message}}
  }
};
