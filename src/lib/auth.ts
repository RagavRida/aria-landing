/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const API_BASE: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

interface User {
  id?: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface SignupPayload {
  email: string;
  password: string;
  name?: string;
}

interface SigninPayload {
  email: string;
  password: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const detail =
      (data.detail as string | undefined) ??
      (data.error as string | undefined) ??
      (data.message as string | undefined) ??
      `Request failed (${res.status})`;
    throw new Error(typeof detail === "string" ? detail : "Request failed");
  }
  return data as T;
}

async function authed<T>(path: string): Promise<T> {
  const token = authApi.getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

export const authApi = {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const res = await post<AuthResponse>("/api/auth/signup", payload);
    localStorage.setItem("aria_token", res.token);
    return res;
  },

  async signin(payload: SigninPayload): Promise<AuthResponse> {
    const res = await post<AuthResponse>("/api/auth/signin", payload);
    localStorage.setItem("aria_token", res.token);
    return res;
  },

  me(): Promise<User> {
    return authed<User>("/api/auth/me");
  },

  logout() {
    localStorage.removeItem("aria_token");
    window.location.href = "/";
  },

  getToken() {
    return localStorage.getItem("aria_token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
