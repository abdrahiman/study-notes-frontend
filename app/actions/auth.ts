"use server";

import { redirect } from "next/navigation";

// import { API_HOST } from "../utils/api";
let API_HOST = "";

export let LoginAction = async (formData: FormData) => {
  console.log("Login");
  try{
    let crud = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(crud);
    let data = await fetch(API_HOST + "auth/login", {
      headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(crud),
    method: "POST",
  });
  if (data.ok) {
    let user = await data.json();
    redirect("/login?token=" + user.access_token)
  }
  // return {state:{message:"err.message"}}
}catch(err:any){
  console.log(err.message);
  redirect("/login?token=" + "user")
  // return {state:{message:err.message}}
}
};