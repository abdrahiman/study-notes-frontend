import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let slug = req.nextUrl.href.split("/").at(-1);
  if (!slug) {
    return new Response("Not Found");
  }
  return NextResponse.redirect(
    "https://res.cloudinary.com/dgvxswr30/image/upload/My%20Uploads/" + slug
  );
}
