import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Bell, AlertCircle, Search, ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

interface Notice {
  id: string;
  title: string;
  content: string | null;
  category: string;
  is_urgent: boolean;
  published_at: string;
  attachment_url: string | null;
}

const categories = [
  { value: "all", label: "সকল" },
  { value: "general", label: "সাধারণ" },
  { value: "admission", label: "ভর্তি" },
  { value: "exam", label: "পরীক্ষা" },
  { value: "result", label: "ফলাফল" },
  { value: "event", label: "অনুষ্ঠান" },
  { value: "scholarship", label: "বৃত্তি" },
];

const ITEMS_PER_PAGE = 10;

const NoticePage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchNotices();
  }, [selectedCategory, currentPage]);

  const fetchNotices = async () => {
    setLoading(true);
    
    let query = supabase
      .from("notices")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("is_urgent", { ascending: false })
      .order("published_at", { ascending: false });

    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory as "general" | "admission" | "exam" | "result" | "event" | "scholarship" | "urgent");
    }

    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching notices:", error);
    } else {
      setNotices(data || []);
      setTotalCount(count || 0);
    }

    setLoading(false);
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const getCategoryLabel = (cat: string) => {
    const found = categories.find((c) => c.value === cat);
    return found ? found.label : cat;
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "d MMMM, yyyy", { locale: bn });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <Helmet>
        <title>নোটিশ বোর্ড | রাজশাহী হাদিত মহাবিদ্যালয়</title>
        <meta name="description" content="রাজশাহী হাদিত মহাবিদ্যালয়ের সকল বিজ্ঞপ্তি, নোটিশ ও ঘোষণা।" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container-main text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-4">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">বিজ্ঞপ্তি</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              নোটিশ বোর্ড
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              মহাবিদ্যালয়ের সকল গুরুত্বপূর্ণ বিজ্ঞপ্তি ও ঘোষণা এখানে পাবেন
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border bg-card">
          <div className="container-main">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="নোটিশ খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notices List */}
        <section className="section-padding">
          <div className="container-main">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">কোনো নোটিশ পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="card-elevated p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group"
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      notice.is_urgent
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {notice.is_urgent ? (
                        <AlertCircle className="w-6 h-6" />
                      ) : (
                        <Bell className="w-6 h-6" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {notice.is_urgent && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground">
                            জরুরি
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                          {getCategoryLabel(notice.category)}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                        {notice.title}
                      </h3>
                      {notice.content && (
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {notice.content}
                        </p>
                      )}
                    </div>

                    {/* Date & Action */}
                    <div className="flex items-center gap-4 md:flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(notice.published_at)}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  পূর্ববর্তী
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  পরবর্তী
                </Button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NoticePage;
