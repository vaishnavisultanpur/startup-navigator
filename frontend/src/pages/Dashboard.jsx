import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Users, History } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { dashboardApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const COLORS = ["#E8A33D", "#14213D", "#4C7A5E", "#28406B", "#C6832A"];

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-navy-900/10 rounded-2xl p-5 flex items-center gap-4">
      <span className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-amber-600" />
      </span>
      <div>
        <p className="text-2xl font-display text-navy-900 leading-none">{value}</p>
        <p className="text-xs font-mono text-ink/50 mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const res = await dashboardApi.get();
      setData(res.data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        {user?.is_admin ? "Admin overview" : "Your dashboard"}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-8">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>

      {status === "loading" && <Loader label="Loading your dashboard..." />}
      {status === "error" && <ErrorState message="Couldn't load dashboard data." onRetry={load} />}

      {status === "ready" && data && (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <StatCard icon={Search} label="Total searches" value={data.total_searches} />
            <StatCard icon={FileText} label="Articles in knowledge base" value={data.total_articles} />
            {user?.is_admin ? (
              <StatCard icon={Users} label="Registered users" value={data.total_users} />
            ) : (
              <Link to="/search" className="focus-ring rounded-2xl">
                <div className="bg-navy-900 text-paper rounded-2xl p-5 flex items-center justify-between h-full hover:bg-navy-800 transition-colors">
                  <div>
                    <p className="font-display text-lg leading-tight">Ask a new question</p>
                    <p className="text-xs text-paper/60 mt-1 font-mono">Go to AI Search</p>
                  </div>
                  <Search className="w-5 h-5 text-amber-400" />
                </div>
              </Link>
            )}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-white border border-navy-900/10 rounded-2xl p-6">
              <h2 className="font-display text-lg text-navy-900 mb-4">Top categories searched</h2>
              {data.top_categories.length === 0 ? (
                <EmptyState icon={Search} title="No searches yet" description="Ask a question in AI Search to see stats here." />
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.top_categories}
                        dataKey="count"
                        nameKey="category"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {data.top_categories.map((entry, i) => (
                          <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 justify-center mt-2">
                    {data.top_categories.map((c, i) => (
                      <div key={c.category} className="flex items-center gap-1.5 text-xs text-ink/60">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        {c.category}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 bg-white border border-navy-900/10 rounded-2xl p-6">
              <h2 className="font-display text-lg text-navy-900 mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-amber-500" /> Recent searches
              </h2>
              {data.recent_searches.length === 0 ? (
                <EmptyState icon={History} title="No search history yet" />
              ) : (
                <div className="flex flex-col divide-y divide-navy-900/5">
                  {data.recent_searches.map((s) => (
                    <div key={s.id} className="py-3">
                      <p className="text-sm text-navy-900 font-medium">{s.query}</p>
                      <p className="text-xs text-ink/50 font-mono mt-1">
                        {new Date(s.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
