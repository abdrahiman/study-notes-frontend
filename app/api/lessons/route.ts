import { NextRequest, NextResponse } from "next/server";
import Lesson from "./lesson";
// Validation function
function validateLesson(payload: any) {
  if (!payload.name || typeof payload.name !== "string") {
    return "Name is required and must be a string";
  }
  if (!payload.description || typeof payload.description !== "string") {
    return "Description is required and must be a string";
  }
  if (!payload.fileUrl || typeof payload.fileUrl !== "string") {
    return "Grade is required and must be a string";
  }
  return null;
}

// API handler
export async function GET(req: NextRequest) {
  const {
    id,
    q,
    grade,
    subject,
    limit = "10",
    cursor,
    sort = "-createdAt",
  } = Object.fromEntries(req.nextUrl.searchParams.entries());

  if (id) {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return NextResponse.json(
        { message: `Lesson with id:${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(lesson);
  }

  let filters: any = {};
  if (q) {
    filters.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }
  if (grade) filters.grade = grade;
  if (subject) filters.subject = subject;

  let query = Lesson.find(filters).limit(parseInt(limit)).sort(sort);
  if (cursor) query = query.where("_id").gt(+cursor);

  const lessons = await query.exec();
  const total = await Lesson.countDocuments(filters);

  return NextResponse.json({ total, lessons });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  payload.publisher = req.headers.get("user-id") || ""; // Assuming user ID is passed in headers

  const error = validateLesson(payload);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const newLesson = new Lesson(payload);
  await newLesson.save();
  return NextResponse.json({ message: "Created!" });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const payload = await req.json();
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  if (!updatedLesson) {
    return NextResponse.json(
      { message: `Lesson with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedLesson);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const deletedLesson = await Lesson.findByIdAndDelete(id);
  if (!deletedLesson) {
    return NextResponse.json(
      { message: `Lesson with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted!" });
}

export const uploadImage = async (file: File) => {
  const data = new FormData();
  const blob = new Blob([file], { type: "image/png" });
  data.append("file", blob);
  let IMAGE_PRESET = "ilmamcdn";
  data.append("upload_preset", IMAGE_PRESET);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgvxswr30/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const fileUploaded = await res.json();
  return fileUploaded.secure_url;
};
