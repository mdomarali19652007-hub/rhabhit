import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
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

type Faculty = Tables<"faculty">;
type Department = Tables<"departments">;

const FacultyAdminPage = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department_id: "",
    department_name: "",
    email: "",
    phone: "",
    bio: "",
    avatar_url: "",
    is_active: true,
    display_order: 0,
  });

  const fetchData = async () => {
    const [facultyRes, deptRes] = await Promise.all([
      supabase.from("faculty").select("*").order("display_order"),
      supabase.from("departments").select("*").eq("is_active", true).order("display_order"),
    ]);

    if (facultyRes.error) {
      toast.error("শিক্ষক লোড করতে সমস্যা হয়েছে");
    } else {
      setFaculty(facultyRes.data || []);
    }

    if (deptRes.data) setDepartments(deptRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      department_id: "",
      department_name: "",
      email: "",
      phone: "",
      bio: "",
      avatar_url: "",
      is_active: true,
      display_order: faculty.length,
    });
    setSelectedFaculty(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (f: Faculty) => {
    setSelectedFaculty(f);
    setFormData({
      name: f.name,
      designation: f.designation,
      department_id: f.department_id || "",
      department_name: f.department_name || "",
      email: f.email || "",
      phone: f.phone || "",
      bio: f.bio || "",
      avatar_url: f.avatar_url || "",
      is_active: f.is_active ?? true,
      display_order: f.display_order || 0,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (f: Faculty) => {
    setSelectedFaculty(f);
    setDeleteDialogOpen(true);
  };

  const handleDepartmentChange = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    setFormData({
      ...formData,
      department_id: deptId,
      department_name: dept?.name || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.designation.trim()) {
      toast.error("নাম এবং পদবী আবশ্যক");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      designation: formData.designation.trim(),
      department_id: formData.department_id || null,
      department_name: formData.department_name || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      bio: formData.bio.trim() || null,
      avatar_url: formData.avatar_url.trim() || null,
      is_active: formData.is_active,
      display_order: formData.display_order,
    };

    if (selectedFaculty) {
      const { error } = await supabase
        .from("faculty")
        .update(payload)
        .eq("id", selectedFaculty.id);

      if (error) {
        toast.error("শিক্ষক আপডেট করতে সমস্যা হয়েছে");
      } else {
        toast.success("শিক্ষক আপডেট হয়েছে");
        setDialogOpen(false);
        fetchData();
      }
    } else {
      const { error } = await supabase.from("faculty").insert([payload]);

      if (error) {
        toast.error("শিক্ষক যোগ করতে সমস্যা হয়েছে");
      } else {
        toast.success("শিক্ষক যোগ হয়েছে");
        setDialogOpen(false);
        fetchData();
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedFaculty) return;

    const { error } = await supabase
      .from("faculty")
      .delete()
      .eq("id", selectedFaculty.id);

    if (error) {
      toast.error("শিক্ষক মুছতে সমস্যা হয়েছে");
    } else {
      toast.success("শিক্ষক মুছে ফেলা হয়েছে");
      setDeleteDialogOpen(false);
      fetchData();
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
        <title>শিক্ষক ব্যবস্থাপনা | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">শিক্ষক ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground mt-1">সকল শিক্ষক পরিচালনা করুন</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            নতুন শিক্ষক
          </Button>
        </div>

        {/* Faculty Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculty.length === 0 ? (
            <div className="col-span-full bg-card rounded-xl border border-border p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোনো শিক্ষক পাওয়া যায়নি</p>
            </div>
          ) : (
            faculty.map((f) => (
              <div key={f.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {f.avatar_url ? (
                      <img src={f.avatar_url} alt={f.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{f.name}</h3>
                    <p className="text-sm text-muted-foreground">{f.designation}</p>
                    {f.department_name && (
                      <p className="text-xs text-muted-foreground mt-1">{f.department_name}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    {!f.is_active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600">
                        নিষ্ক্রিয়
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(f)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(f)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFaculty ? "শিক্ষক সম্পাদনা" : "নতুন শিক্ষক"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>নাম *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="পূর্ণ নাম"
                className="mt-2"
              />
            </div>
            <div>
              <Label>পদবী *</Label>
              <Input
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="যেমন: প্রভাষক, সহকারী অধ্যাপক"
                className="mt-2"
              />
            </div>
            <div>
              <Label>বিভাগ</Label>
              <Select value={formData.department_id} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ইমেইল</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>মোবাইল</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label>ছবির লিংক</Label>
              <Input
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://..."
                className="mt-2"
              />
            </div>
            <div>
              <Label>সংক্ষিপ্ত পরিচয়</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="শিক্ষকের সংক্ষিপ্ত পরিচয়"
                className="mt-2"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
              />
              <Label>সক্রিয়</Label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit">
                {selectedFaculty ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>শিক্ষক মুছে ফেলুন?</AlertDialogTitle>
            <AlertDialogDescription>
              এই কাজটি ফিরিয়ে আনা যাবে না। শিক্ষকের তথ্য স্থায়ীভাবে মুছে যাবে।
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

export default FacultyAdminPage;
