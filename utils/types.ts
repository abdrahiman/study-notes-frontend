export const API_HOST =
  "https://5000-idx-raaajel-1722765041064.cluster-23wp6v3w4jhzmwncf7crloq3kw.cloudworkstations.dev";

export interface ILesson {
  _id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  publisher: {};
  tags: string[];
  images: string[];
  createdAt: Date;
}

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  verified: boolean;
  role: string;
  createdAt: Date;
}

export const SubjectsArColor = {
  math: { color: "#086bea", arabic: "الرياضيات" },
  svt: { color: "#22c55e", arabic: "علوم الحياة والارض" },
  pc: { color: "#a855f7", arabic: "الفيزياء والكيمياء" },
  philo: { color: "#f97316", arabic: "الفلسفة" },
  arabic: { color: "#f72516", arabic: "العربية" },
  frencais: { color: "#f43f5e", arabic: "اللغة الفرنسية" },
  english: { color: "#a852f7", arabic: "اللغة الانجلينزية" },
  history: { color: "#eab308", arabic: "الاجتماعيات" },
  islamique: { color: "#22c55e", arabic: "التربية الاسلامية" },
  computer_science: { color: "#0f0000", arabic: "علوم الحاسب" },
};
