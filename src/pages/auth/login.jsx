import { LoginForm } from "./components/login-form";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/services/auth.service";

export default function LoginPage() {
  if (getAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-svh overflow-hidden flex-col items-center justify-center bg-muted p-4 md:p-6">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
