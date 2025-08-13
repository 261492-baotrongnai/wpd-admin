import PageContainer from "@/app/(Layout)/components/container/PageContainer";
import { cookies } from "next/headers";

export default async function CallbackPage() {
  const cookieStore = await cookies();
  console.log("Cookies:", cookieStore.getAll());
  const userInfo = JSON.parse(cookieStore.get("user_info")?.value || "{}");

  return (
    <PageContainer title="Callback" description="this is Callback Page">
      <div style={{ maxWidth: "400px", wordBreak: "break-all" }}>
        <h1>Callback Page</h1>
        <p>User Info: {JSON.stringify(userInfo)}</p>
      </div>
    </PageContainer>
  );
}
