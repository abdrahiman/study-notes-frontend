import { LessonForm } from "@/app/components/form";

export default function Create() {
  return (
    <div className="w-full flex justify-center px-2 items-center h-full flex-col relative">
      <h1 className="text-2xl font-semibold mb-5">انشاء ملخص</h1>

      <LessonForm />
    </div>
  );
}
