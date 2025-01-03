"use client";
import React, { useState } from "react";
import axios from "axios";
import { ILesson } from "@/utils/types";
import { getPdfFromLink } from "../actions/lessons";

const LessonForm = ({ lesson }: { lesson: ILesson }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fileUrl:
      "https://mega.nz/file/yBMARIgT#Bls-zCsqfssMR2PfEihzD5ax5FRZNuiSF1l9Mp2vp8E",
    title: lesson?.title || "",
    description: lesson?.description || "",
    grade: lesson?.grade || "7eme",
    subject: lesson?.subject || "math",
    tags: lesson?.tags?.join(", ") || "",
  });
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (file) {
        if (file.type != "application/pdf") {
          setError("Please upload a PDF file");
          return;
        }
        let fd = new FormData();
        fd.append("pdfFile", file);
        setFileName("Loading...");
        let res = await axios.post("/api/upload", fd);
        setFormData({ ...formData, fileUrl: res.data.link });
        console.log(res);
        setFileName(file.name);
        setError("");
      }
    } catch (er) {
      console.log(er);
      setError("Error while uploading this pdf");
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.fileUrl) {
      setError("Please upload a file first");
      return;
    }
    if (step === 2 && (!formData.title || !formData.description)) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.tags) {
      setError("Please add at least one tag");
      return;
    }
    try {
      console.log({
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      });
      console.log({ PDF: await getPdfFromLink(formData.fileUrl) });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const renderStepIndicator = () => {
    const steps = ["رفع الملف", "المعلومات", "التفاصيل"];
    return (
      <div className="flex justify-between items-center mb-6">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${
                i + 1 === step
                  ? "bg-purple-100 text-purple-600"
                  : i + 1 < step
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }
            `}
            >
              {i + 1}
            </div>
            <span className="text-xs mr-1">{label}</span>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 mx-2 ${
                  i + 1 < step ? "bg-purple-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">رفع ملف pdf</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
              >
                اختيار ملف
              </label>
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">{fileName}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">العنوان</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter lesson title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter lesson description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">المستوى</label>
              <select
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7eme">7eme</option>
                <option value="8eme">8eme</option>
                <option value="9eme">9eme</option>
                <option value="tcs">TCS</option>
                <option value="tcl">TCL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">المادة</label>
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="math">Mathematics</option>
                <option value="phisic">Physics</option>
                <option value="arabic">Arabic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                كلمات المفتاحية (منفصلين بفاصلة)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="e.g., algebra, equations, basics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {lesson ? "انشاء درس" : "تعديل"}
      </h2>

      {renderStepIndicator()}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              رجوع
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-auto"
            >
              التالي
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-auto"
            >
              {lesson ? "تعديل" : "انشاء"} Lesson
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export { LessonForm };
