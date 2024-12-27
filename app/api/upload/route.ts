import { NextRequest } from "next/server";
import axios from "axios";
const apiKey = process.env.PDF_SECRET;
const apiUrl = `https://api.iloveimg.com/v1/pdfjpg`;

export async function POST(req: NextRequest) {
  try {
    console.log(apiKey);
    const formData = await req.formData();
    const pdfFile = formData.get("pdfFile") as File;

    const formDataToSend = new FormData();
    formDataToSend.append("file", pdfFile);

    let res = await axios.post(apiUrl, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const images = res.data.images;
    return new Response(
      JSON.stringify({
        message: "Conversion successful",
        images: images,
      })
    );
    return new Response(
      JSON.stringify({
        message: "Conversion successful",
      })
    );
  } catch (error: any) {
    console.error("Conversion error:", error);
    return new Response(
      JSON.stringify({ message: "Conversion failed", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
