"use client";
import Link from "next/link";

export function Card(){
  return(
    <Link href='/l/2' className="card flex flex-col h-80 rounded-xl bg-wGray100 dark:bg-dGray100 shadow-md">
    <div className="image bg-gray-700 h-full overflow-hidden rounded-xl">
      <img src="/test.jpg" alt="title" className="w-full h-full object-cover" />
    </div>
    <div className="info h-fit min-h-fit flex flex-col gap-2 p-2">
      <h3 className="text-xl">
      الموجات الديناميكية
      </h3>
      <p>
    تانية باك فيزياء
      </p>
      </div>
  </Link>
  )
}