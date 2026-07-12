import { clearAuthSession } from "@/services/auth.service";

let isRedirecting = false;

export function handleSSEUnauthorized(response) {
  if (response.status !== 401) {
    return false;
  }

  clearAuthSession();

  if (!isRedirecting && window.location.pathname !== "/login") {
    isRedirecting = true;
    window.location.replace("/login");
  }

  return true;
}