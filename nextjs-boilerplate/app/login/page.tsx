"use client";

import { useState } from "react";

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login successful (mock)");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        id="login-form"
        data-testid="login-form"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h1
          id="login-title"
          data-testid="login-title"
          className="text-2xl font-semibold mb-6 text-center"
        >
          Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email-input" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email-input"
            name="email"
            data-testid="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="email-error"
          />
          {errors.email && (
            <p
              id="email-error"
              data-testid="email-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password-input" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password-input"
            name="password"
            data-testid="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="password-error"
          />
          {errors.password && (
            <p
              id="password-error"
              data-testid="password-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          id="login-button"
          data-testid="login-button"
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
