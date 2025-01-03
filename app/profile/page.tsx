import { getter } from "@/app/actions/api";
import { Profile } from "./+page";

export default async function Page() {
  //server stuff
  // let user = await getter("/auth/me");
  let user = {
    _id: "0101",
    avatar: "/user.png",
    name: "طارق",
    email: "bob@gmail.com",
    verified: false,
    role: "Admin",
  };

  return <Profile user={user} />;
}
