import { imagesToPDF } from "@coderosh/images-to-pdf";

export const UrlsToPDF = async (imagesurls: string[]) => {
  const images = await Promise.all(
    imagesurls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
  );
  const pdf = await imagesToPDF(images);
  const dataUrl = pdf.dataUrl();
  return dataUrl;
};

export const InputFilesToPDF = async (files: FormDataEntryValue[]) => {
  const imageFiles = files.filter((file) => file instanceof File) as File[];

  // Convert files to ArrayBuffers
  const imageArrayBuffers = await Promise.all(
    imageFiles.map((file) => file.arrayBuffer())
  );
  const pdf = await imagesToPDF(imageArrayBuffers);
  return pdf.dataUrl();
};


