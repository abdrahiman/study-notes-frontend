"use server";

import { cookies } from "next/headers";

export let LoginAction = async (formData: FormData): Promise<void> => {
  console.log("Login");
  try {
    let crud = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // let data = await create("auth/login", crud);
    let data = { access_token: "" };
    let token = null;
    if (data.access_token) {
      token = data.access_token;
      (await cookies()).set("access_token", token);
    }
  } catch (err: any) {
    console.log(err.message);
    // return {state:{message:err.message}}
  }
};
