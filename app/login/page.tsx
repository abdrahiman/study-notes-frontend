import { LoginAction } from "../actions/auth";

export default function Login({searchParams}:{searchParams?:{token:string}}){
  if(searchParams?.token){
    console.log({token:searchParams.token});
  }
  return (
<div className="w-full flex justify-center px-2 items-center min-h-screen">
  <form
    className="rounded-xl items-center max-w-sm -mt-24 w-full flex flex-col gap-4 h-full"
    action={LoginAction}
  >
    <div className="flex flex-col w-full">
      <label className="mb-2">الايميل:</label>
      <input
        type="email"
        required
        id=""
        className="max-w-sm py-2 px-2 bg-wGray100 dark:bg-dGray100 outline-purple-600"
        name="email"
      />
    </div>
    <div className="flex flex-col w-full">
      <label className="mb-2">كلمة المرور:</label>
      <input
        type="password"
        id=""
        required
        className="max-w-sm w-full py-2 px-2 bg-wGray100 dark:bg-dGray100 outline-purple-600"
        name="password"
      />
    </div>
    <button className="btn w-full max-w-sm bg-purple-600 text-white py-2"
      >تسجيل الدخول</button>
  </form>
</div>
  )
}