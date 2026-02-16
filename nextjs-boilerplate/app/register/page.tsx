"use client";

import { useState } from "react";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
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
      alert("Registration successful (mock)");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        id="register-form"
        data-testid="register-form"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h1
          id="register-title"
          data-testid="register-title"
          className="text-2xl font-semibold mb-6 text-center"
        >
          Register
        </h1>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name-input" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name-input"
            name="name"
            data-testid="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="name-error"
          />
          {errors.name && (
            <p
              id="name-error"
              data-testid="name-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="register-email-input" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="register-email-input"
            name="email"
            data-testid="register-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="register-email-error"
          />
          {errors.email && (
            <p
              id="register-email-error"
              data-testid="register-email-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="register-password-input" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="register-password-input"
            name="password"
            data-testid="register-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="register-password-error"
          />
          {errors.password && (
            <p
              id="register-password-error"
              data-testid="register-password-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirm-password-input" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirm-password-input"
            name="confirmPassword"
            data-testid="confirm-password-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            aria-describedby="confirm-password-error"
          />
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              data-testid="confirm-password-error"
              role="alert"
              className="text-red-600 text-sm mt-1"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          id="register-button"
          data-testid="register-button"
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
