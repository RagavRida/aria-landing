/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface User {
  email: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: User;
  error?: string;
}

export const authApi = {
  async signup(data: any): Promise<AuthResponse> {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Signup failed");
    }
    const result = await res.json();
    localStorage.setItem("aria_token", result.token);
    return result;
  },

  async signin(data: any): Promise<AuthResponse> {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Signin failed");
    }
    const result = await res.json();
    localStorage.setItem("aria_token", result.token);
    return result;
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
  }
};
