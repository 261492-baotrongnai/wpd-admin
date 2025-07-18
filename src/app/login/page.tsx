import { getLineLoginUrl } from "../services/line.service";

export default async function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <a href={await getLineLoginUrl()}>
        <button type="button">Login with LINE</button>
      </a>
    </div>
  );
}
