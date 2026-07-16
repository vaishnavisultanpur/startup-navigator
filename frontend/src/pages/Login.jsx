import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Compass, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from || "/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Compass className="w-8 h-8 text-amber-500 mb-3" />
          <h1 className="font-display text-2xl text-navy-900">Welcome back</h1>
          <p className="text-sm text-ink/60 mt-1">Log in to continue your journey</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white border border-navy-900/10 rounded-2xl p-6 flex flex-col gap-4">
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
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
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-navy-900 text-paper rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-navy-800 transition-colors disabled:opacity-50 focus-ring"
          >
            <LogIn className="w-4 h-4" /> {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs font-mono text-amber-800 leading-relaxed">
          Demo admin: admin@startupnavigator.com / Admin@123<br />
          Demo user: user@startupnavigator.com / User@123
        </div>

        <p className="text-center text-sm text-ink/60 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-navy-900 font-semibold hover:text-amber-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
