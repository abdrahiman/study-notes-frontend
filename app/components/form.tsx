"use client";
import { CreateLesson, UpdateLesson } from "@/app/actions/lessons";
import { ILesson } from "@/utils/types";
import { InputFilesToPDF } from "@/utils/pdf";
import { useState } from "react";
import { create } from "../actions/api";
import axios from "axios";

export const LessonForm = ({ lesson }: { lesson?: ILesson }) => {
  let [errorMsg, setError] = useState("");
  let [isPDFMode, setMode] = useState(true);

  // let upload = async (e: any) => {
  //   let pdf = e.target.files[0];
  //   console.log(pdf);
  //   let fd = new FormData();
  //   fd.append("file", pdf);
  //   let res = await axios.post("/api/upload", fd);
  //   console.log(res);
  // };
  return (
    <form
      className="rounded-xl items-center max-w-sm w-full flex flex-col gap-4 h-fit text-black"
      // action={lesson ? UpdateLesson : CreateLesson}
      method="post"
      encType="multipart/form-data"
      action={"/api/upload"}
    >
      {errorMsg && (
        <p
          dir="auto"
          className="error w-full bg-red-800/40 border border-red-600 px-2 py-2 rounded-lg"
        >
          {errorMsg || ""}
        </p>
      )}
      <input type="hidden" value={lesson?._id} name="id" />

      <div className="flex flex-col w-full h-fit ">
        <label className="">الملفات</label>
        <div className="px-10 py-2 text-center rounded-xl bg-slate-200 border-premary border-2 relative">
          ارفع الصور
          <input
            type="file"
            name="pdfFile"
            // accept=".png,.jpg,.jpeg"
            accept=".pdf"
            className="absolute left-0 top-0 opacity-0 w-full h-full z-10"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">العنوان</label>
        <input
          type="text"
          id=""
          defaultValue={lesson?.title || ""}
          className="max-w-sm py-2 px-2 bg-white rounded-lg dark:bg-dGray200"
          name="title"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">الوصف</label>
        <textarea
          id=""
          defaultValue={lesson?.description || ""}
          className="max-w-sm py-2 px-2  bg-white rounded-lg dark:bg-dGray200 outline-purple-600"
          name="description"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">المستوى</label>
        <select
          name="grade"
          id=""
          defaultValue={lesson?.grade || ""}
          className="py-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600 px-2"
        >
          <option value="7eme">7eme</option>
          <option value="8eme">8eme</option>
          <option value="9eme">9eme</option>
          <option value="tcs">TCS</option>
          <option value="tcl">TCL</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">المادة</label>
        <select
          name="subject"
          defaultValue={lesson?.subject || ""}
          id=""
          className="py-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600 px-2"
        >
          <option value="math">math</option>
          <option value="phisic">phisic</option>
          <option value="arabic">arabic</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-2">الكلمات المفتاحية(منفصلة ب,)</label>
        <input
          type="text"
          required
          id=""
          className="max-w-sm py-2 px-2 bg-white rounded-lg dark:bg-dGray200 outline-purple-600"
          defaultValue={lesson?.tags.join(", ") || ""}
          name="tags"
        />
      </div>
      <button className="btn w-full max-w-sm bg-premary text-white py-2 rounded-lg">
        {lesson ? "تعديل" : "أنشاء"}
      </button>
    </form>
  );
};

// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import {
//   ChevronRight,
//   ChevronLeft,
//   Upload,
//   FileText,
//   BookOpen,
//   Tag,
// } from "lucide-react";
// import { ILesson } from "@/utils/types";

// const LessonForm = ({ lesson }: { lesson?: ILesson }) => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     file: null,
//     title: lesson?.title || "",
//     description: lesson?.description || "",
//     grade: lesson?.grade || "7eme",
//     subject: lesson?.subject || "math",
//     tags: lesson?.tags?.join(", ") || "",
//   });
//   const [error, setError] = useState("");
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== "application/pdf") {
//         setError("Please upload a PDF file");
//         return;
//       }
//       setFormData({ ...formData, file });
//       setFileName(file.name);
//       setError("");
//     }
//   };

//   const handleNext = () => {
//     if (step === 1 && !formData.file) {
//       setError("Please upload a file first");
//       return;
//     }
//     if (step === 2 && (!formData.title || !formData.description)) {
//       setError("Please fill in all required fields");
//       return;
//     }
//     setError("");
//     setStep(step + 1);
//   };

//   const handleBack = () => setStep(step - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.tags) {
//       setError("Please add at least one tag");
//       return;
//     }
//     // Transform tags string to array
//     const formDataToSubmit = {
//       ...formData,
//       tags: formData.tags.split(",").map((tag) => tag.trim()),
//     };
//     try {
//       await onSubmit(formDataToSubmit);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 transition-colors">
//               <Upload className="w-12 h-12 text-gray-400 mb-4" />
//               <p className="text-sm text-gray-600 mb-2">Upload your PDF file</p>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
//               >
//                 Choose File
//               </label>
//               {fileName && (
//                 <p className="mt-2 text-sm text-gray-600">{fileName}</p>
//               )}
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title</label>
//               <Input
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 placeholder="Enter lesson title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Description
//               </label>
//               <Textarea
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 placeholder="Enter lesson description"
//                 className="min-h-[100px]"
//               />
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Grade Level
//               </label>
//               <select
//                 value={formData.grade}
//                 onChange={(value) =>
//                   setFormData({ ...formData, grade: value })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select grade" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="7eme">7eme</SelectItem>
//                   <SelectItem value="8eme">8eme</SelectItem>
//                   <SelectItem value="9eme">9eme</SelectItem>
//                   <SelectItem value="tcs">TCS</SelectItem>
//                   <SelectItem value="tcl">TCL</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Subject</label>
//               <Select
//                 value={formData.subject}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, subject: value })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select subject" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="math">Mathematics</SelectItem>
//                   <SelectItem value="phisic">Physics</SelectItem>
//                   <SelectItem value="arabic">Arabic</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Tags (comma-separated)
//               </label>
//               <Input
//                 value={formData.tags}
//                 onChange={(e) =>
//                   setFormData({ ...formData, tags: e.target.value })
//                 }
//                 placeholder="e.g., algebra, equations, basics"
//               />
//             </div>
//           </div>
//         );
//     }
//   };

//   const steps = [
//     { icon: <Upload className="w-4 h-4" />, label: "Upload" },
//     { icon: <FileText className="w-4 h-4" />, label: "Details" },
//     { icon: <Tag className="w-4 h-4" />, label: "Metadata" },
//   ];

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-center">
//           {lesson ? "Edit Lesson" : "Create New Lesson"}
//         </CardTitle>
//         <div className="flex justify-between items-center mt-4">
//           {steps.map((s, i) => (
//             <div
//               key={i}
//               className={`flex items-center ${
//                 i < step ? "text-purple-600" : "text-gray-400"
//               }`}
//             >
//               <div
//                 className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                   i + 1 === step
//                     ? "bg-purple-100 text-purple-600"
//                     : i + 1 < step
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <span className="text-xs ml-1">{s.label}</span>
//               {i < steps.length - 1 && (
//                 <div
//                   className={`h-0.5 w-12 mx-2 ${
//                     i + 1 < step ? "bg-purple-600" : "bg-gray-200"
//                   }`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {renderStep()}
//           <div className="flex justify-between mt-6">
//             {step > 1 && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleBack}
//                 className="flex items-center"
//               >
//                 <ChevronLeft className="w-4 h-4 mr-1" />
//                 Back
//               </Button>
//             )}
//             {step < 3 ? (
//               <Button
//                 type="button"
//                 onClick={handleNext}
//                 className="flex items-center ml-auto"
//               >
//                 Next
//                 <ChevronRight className="w-4 h-4 ml-1" />
//               </Button>
//             ) : (
//               <Button type="submit" className="flex items-center ml-auto">
//                 {lesson ? "Update" : "Create"} Lesson
//               </Button>
//             )}
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default LessonForm;
