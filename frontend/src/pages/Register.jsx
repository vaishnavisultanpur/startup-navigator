import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Compass className="w-8 h-8 text-amber-500 mb-3" />
          <h1 className="font-display text-2xl text-navy-900">Start your journey</h1>
          <p className="text-sm text-ink/60 mt-1">Create an account to save your search history</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-navy-900/10 rounded-2xl p-6 flex flex-col gap-4">
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-amber-500 text-navy-950 rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-50 focus-ring"
          >
            <UserPlus className="w-4 h-4" /> {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-ink/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-navy-900 font-semibold hover:text-amber-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
