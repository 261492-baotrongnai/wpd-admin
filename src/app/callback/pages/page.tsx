import { cookies } from "next/headers";

export default async function CallbackPage() {
  const cookieStore = await cookies();
  console.log("Cookies:", cookieStore.getAll());
  const userInfo = JSON.parse(cookieStore.get("user_info")?.value || "{}");

  return (
    <div>
      <h1>Callback Page</h1>
      <p>User Info: {JSON.stringify(userInfo)}</p>
    </div>
  );
}
