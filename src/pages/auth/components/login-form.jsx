import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth.service";
import { toast } from "sonner";
import { Activity, ShieldCheck } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("superadmin@smartclinic.local");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      toast.success("Login berhasil", {
        description: "Selamat datang kembali di Smart Clinic.",
      });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login gagal. Periksa email dan password admin.";

      setError(message);
      toast.error("Login gagal", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="hidden h-[540px] flex-col justify-between bg-sidebar p-7 text-white md:flex lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
                <Activity className="size-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white">Smart Clinic</span>
                <span className="text-xs text-white/70">Clinical CRM</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                <ShieldCheck className="size-3.5" />
                Admin workspace
              </div>
              <div className="space-y-2.5">
                <div className="max-w-sm text-xl font-semibold leading-snug text-white lg:text-2xl">
                  Kelola percakapan, pasien, dan operasional klinik dari satu tempat.
                </div>
                <p className="max-w-sm text-xs leading-5 text-white/75">
                  Masuk untuk memantau dashboard, follow-up pasien, jadwal appointment, dan campaign klinik dengan akses admin yang aman.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-white">
                Smart Clinic CRM
              </p>
              <p className="mt-1.5 text-xs leading-5 text-white/70">
                Dibuat untuk tim klinik yang butuh respon cepat, data rapi, dan koordinasi harian yang ringan.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-7 lg:p-8">
            <FieldGroup className="gap-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <GalleryVerticalEnd className="size-5" />
                  </div>
                  <span className="sr-only">Smart Clinic</span>
                </div>

                <h2 className="m-0 text-xl font-bold text-foreground">Welcome back</h2>
                <FieldDescription className="text-center text-xs">
                  Masuk sebagai admin untuk mengelola CRM klinik.
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="superadmin@smartclinic.local"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loading}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  required
                />
              </Field>

              <Field>
                {error && <FieldError>{error}</FieldError>}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs">
        Akses terbatas untuk admin dan staff Klinik CRM.
      </FieldDescription>
    </div>
  );
}
