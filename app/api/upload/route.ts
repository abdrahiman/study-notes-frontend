import { Storage } from "megajs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdfFile") as File;

    if (!file || file.type != "application/pdf") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const storage = await new Storage({
      email: process.env.MEGA_EMAIL!,
      password: process.env.MEGA_PASSWORD!,
    }).ready;

    const uploadedFile = await storage.upload(
      {
        name: `${file.name || "unknown"}-${uuidv4()}.pdf`,
      },
      buffer
    ).complete;
    const link = await uploadedFile.link(false);

    return NextResponse.json({
      message: "Upload successful",
      link: link,
      fileName: uploadedFile.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
