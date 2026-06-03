import { LoginForm } from "./components/login-form";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/services/auth.service";

export default function LoginPage() {
  if (getAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
