"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        role: "mentee",
    });

    if (profileError) {
        setError("Error creating profile: " + profileError.message);
        return;
    }
    }

    router.push("/mentors");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-900">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4 bg-white p-8 rounded-lg shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-center text-slate-900">Create your account</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded p-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
          minLength={6}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-medium transition-colors">
          Sign Up
        </button>

        <p className="text-sm text-center text-slate-600">
          Already have an account? <a href="/login" className="underline text-blue-600">Log in</a>
        </p>
      </form>
    </div>
  );
}