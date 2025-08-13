import { getLineLoginUrl } from "../services/line.service";
import Button from "@mui/material/Button";
export default async function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <a href={await getLineLoginUrl()}>
        <Button variant="contained" color="primary">
          Login with LINE
        </Button>
      </a>
    </div>
  );
}
