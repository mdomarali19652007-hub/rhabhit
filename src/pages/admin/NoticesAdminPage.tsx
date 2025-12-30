import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Tables } from "@/integrations/supabase/types";

type Notice = Tables<"notices">;
type NoticeCategory = "general" | "admission" | "exam" | "result" | "event" | "scholarship" | "urgent";

const categories: { value: NoticeCategory; label: string }[] = [
  { value: "general", label: "সাধারণ" },
  { value: "admission", label: "ভর্তি" },
  { value: "exam", label: "পরীক্ষা" },
  { value: "result", label: "ফলাফল" },
  { value: "event", label: "অনুষ্ঠান" },
  { value: "scholarship", label: "বৃত্তি" },
  { value: "urgent", label: "জরুরি" },
];

const NoticesAdminPage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as NoticeCategory,
    is_urgent: false,
    is_published: true,
  });

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("নোটিশ লোড করতে সমস্যা হয়েছে");
    } else {
      setNotices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      is_urgent: false,
      is_published: true,
    });
    setSelectedNotice(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (notice: Notice) => {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content || "",
      category: (notice.category as NoticeCategory) || "general",
      is_urgent: notice.is_urgent || false,
      is_published: notice.is_published ?? true,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (notice: Notice) => {
    setSelectedNotice(notice);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("শিরোনাম আবশ্যক");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim() || null,
      category: formData.category,
      is_urgent: formData.is_urgent,
      is_published: formData.is_published,
    };

    if (selectedNotice) {
      const { error } = await supabase
        .from("notices")
        .update(payload)
        .eq("id", selectedNotice.id);

      if (error) {
        toast.error("নোটিশ আপডেট করতে সমস্যা হয়েছে");
      } else {
        toast.success("নোটিশ আপডেট হয়েছে");
        setDialogOpen(false);
        fetchNotices();
      }
    } else {
      const { error } = await supabase.from("notices").insert([payload]);

      if (error) {
        toast.error("নোটিশ তৈরি করতে সমস্যা হয়েছে");
      } else {
        toast.success("নোটিশ তৈরি হয়েছে");
        setDialogOpen(false);
        fetchNotices();
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedNotice) return;

    const { error } = await supabase
      .from("notices")
      .delete()
      .eq("id", selectedNotice.id);

    if (error) {
      toast.error("নোটিশ মুছতে সমস্যা হয়েছে");
    } else {
      toast.success("নোটিশ মুছে ফেলা হয়েছে");
      setDeleteDialogOpen(false);
      fetchNotices();
    }
  };

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
        <title>নোটিশ ব্যবস্থাপনা | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">নোটিশ ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground mt-1">সকল নোটিশ পরিচালনা করুন</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            নতুন নোটিশ
          </Button>
        </div>

        {/* Notices List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {notices.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোনো নোটিশ পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notices.map((notice) => (
                <div key={notice.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      notice.is_urgent ? "bg-red-500/10" : "bg-primary/10"
                    }`}>
                      {notice.is_urgent ? (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{notice.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {categories.find(c => c.value === notice.category)?.label || "সাধারণ"}
                        </span>
                        {!notice.is_published && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                            অপ্রকাশিত
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(notice)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(notice)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedNotice ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>শিরোনাম *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="নোটিশের শিরোনাম"
                className="mt-2"
              />
            </div>
            <div>
              <Label>বিবরণ</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="নোটিশের বিস্তারিত বিবরণ"
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label>ক্যাটাগরি</Label>
              <Select 
                value={formData.category} 
                onValueChange={(v) => setFormData({ ...formData, category: v as NoticeCategory })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_urgent}
                  onCheckedChange={(v) => setFormData({ ...formData, is_urgent: v })}
                />
                <Label>জরুরি নোটিশ</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(v) => setFormData({ ...formData, is_published: v })}
                />
                <Label>প্রকাশিত</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit">
                {selectedNotice ? "আপডেট করুন" : "তৈরি করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>নোটিশ মুছে ফেলুন?</AlertDialogTitle>
            <AlertDialogDescription>
              এই কাজটি ফিরিয়ে আনা যাবে না। নোটিশটি স্থায়ীভাবে মুছে যাবে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NoticesAdminPage;
