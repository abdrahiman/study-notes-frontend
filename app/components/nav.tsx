"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav(){
  let [themeDark,setTheme] = useState(true)
  useEffect(()=>{
    if(!document.querySelector(":root"))return;
    if(document.querySelector(":root")?.classList.contains("dark")){
      setTheme(true)
    }else{
      setTheme(false)
    }
  },[])
  let changeTheme = ()=>{
    if(!document.querySelector(":root"))return;
    if(document.querySelector(":root")?.classList.contains("dark")){
      document.querySelector(":root")?.classList.remove("dark");
      document.querySelector(":root")?.classList.add("light");
      setTheme(false)
    }else{
      document.querySelector(":root")?.classList.remove("light");
      document.querySelector(":root")?.classList.add("dark");
      setTheme(true)
    }
  }
  return(
    <nav className="w-full max-w-6xl mx-auto py-8 px-2 flex justify-between items-center">
      <Link href="/" className="name text-xl font-bold px-6 py-2 bg-white dark:bg-premary rounded-xl">خيزران</Link>
<button onClick={changeTheme}>{themeDark?"Light":"Dark"}</button>
    </nav>
  )
}