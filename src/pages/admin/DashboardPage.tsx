import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, GraduationCap, Building2, TrendingUp, Clock } from "lucide-react";

interface Stats {
  notices: number;
  faculty: number;
  admissions: number;
  departments: number;
  pendingAdmissions: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats>({
    notices: 0,
    faculty: 0,
    admissions: 0,
    departments: 0,
    pendingAdmissions: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [notices, faculty, admissions, departments, pending, recent] = await Promise.all([
        supabase.from("notices").select("id", { count: "exact", head: true }),
        supabase.from("faculty").select("id", { count: "exact", head: true }),
        supabase.from("admissions").select("id", { count: "exact", head: true }),
        supabase.from("departments").select("id", { count: "exact", head: true }),
        supabase.from("admissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("admissions").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        notices: notices.count || 0,
        faculty: faculty.count || 0,
        admissions: admissions.count || 0,
        departments: departments.count || 0,
        pendingAdmissions: pending.count || 0,
      });

      if (recent.data) setRecentAdmissions(recent.data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { icon: FileText, label: "মোট নোটিশ", value: stats.notices, color: "bg-blue-500/10 text-blue-600" },
    { icon: Users, label: "শিক্ষকমণ্ডলী", value: stats.faculty, color: "bg-emerald-500/10 text-emerald-600" },
    { icon: GraduationCap, label: "মোট আবেদন", value: stats.admissions, color: "bg-purple-500/10 text-purple-600" },
    { icon: Building2, label: "বিভাগসমূহ", value: stats.departments, color: "bg-amber-500/10 text-amber-600" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ড্যাশবোর্ড | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground mt-1">স্বাগতম! আপনার অ্যাডমিন প্যানেল ওভারভিউ।</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-6 border border-border">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pending Admissions Alert */}
        {stats.pendingAdmissions > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-foreground">{stats.pendingAdmissions}টি আবেদন অপেক্ষমান</p>
              <p className="text-sm text-muted-foreground">পর্যালোচনার জন্য অপেক্ষা করছে</p>
            </div>
          </div>
        )}

        {/* Recent Admissions */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-heading font-semibold text-foreground">সাম্প্রতিক আবেদন</h2>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {recentAdmissions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                কোনো আবেদন পাওয়া যায়নি
              </div>
            ) : (
              recentAdmissions.map((admission) => (
                <div key={admission.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{admission.student_name}</p>
                    <p className="text-sm text-muted-foreground">{admission.application_number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    admission.status === "pending" 
                      ? "bg-amber-500/10 text-amber-600" 
                      : admission.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-red-500/10 text-red-600"
                  }`}>
                    {admission.status === "pending" ? "অপেক্ষমান" : admission.status === "approved" ? "অনুমোদিত" : "বাতিল"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
