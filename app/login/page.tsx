"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/mentors");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-900">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-white p-8 rounded-lg shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-center text-slate-900">Log in</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-300 rounded p-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded p-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium transition-colors">
          Log In
        </button>

        <p className="text-sm text-center text-slate-600">
          No account? <a href="/signup" className="underline text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}