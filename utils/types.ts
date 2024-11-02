export const API_HOST = "https://studynotes-ayoi.onrender.com";

export interface ILesson {
  _id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  publisher: {};
  tags: string[];
  lesson: string[];
}

export interface IUser {
  _id: string,
  avatar: string,
  name: string,
  email: string,
  verified: boolean,
  role: string,
};
// l