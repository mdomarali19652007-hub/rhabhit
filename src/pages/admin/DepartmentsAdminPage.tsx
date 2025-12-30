import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

type Department = Tables<"departments">;

const DepartmentsAdminPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    description: "",
    head_name: "",
    student_count: 0,
    is_active: true,
    display_order: 0,
  });

  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("বিভাগ লোড করতে সমস্যা হয়েছে");
    } else {
      setDepartments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      name_en: "",
      description: "",
      head_name: "",
      student_count: 0,
      is_active: true,
      display_order: departments.length,
    });
    setSelectedDepartment(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (dept: Department) => {
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name,
      name_en: dept.name_en || "",
      description: dept.description || "",
      head_name: dept.head_name || "",
      student_count: dept.student_count || 0,
      is_active: dept.is_active ?? true,
      display_order: dept.display_order || 0,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (dept: Department) => {
    setSelectedDepartment(dept);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("বিভাগের নাম আবশ্যক");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      name_en: formData.name_en.trim() || null,
      description: formData.description.trim() || null,
      head_name: formData.head_name.trim() || null,
      student_count: formData.student_count,
      is_active: formData.is_active,
      display_order: formData.display_order,
    };

    if (selectedDepartment) {
      const { error } = await supabase
        .from("departments")
        .update(payload)
        .eq("id", selectedDepartment.id);

      if (error) {
        toast.error("বিভাগ আপডেট করতে সমস্যা হয়েছে");
      } else {
        toast.success("বিভাগ আপডেট হয়েছে");
        setDialogOpen(false);
        fetchDepartments();
      }
    } else {
      const { error } = await supabase.from("departments").insert([payload]);

      if (error) {
        toast.error("বিভাগ তৈরি করতে সমস্যা হয়েছে");
      } else {
        toast.success("বিভাগ তৈরি হয়েছে");
        setDialogOpen(false);
        fetchDepartments();
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedDepartment) return;

    const { error } = await supabase
      .from("departments")
      .delete()
      .eq("id", selectedDepartment.id);

    if (error) {
      toast.error("বিভাগ মুছতে সমস্যা হয়েছে");
    } else {
      toast.success("বিভাগ মুছে ফেলা হয়েছে");
      setDeleteDialogOpen(false);
      fetchDepartments();
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
        <title>বিভাগ ব্যবস্থাপনা | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">বিভাগ ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground mt-1">সকল বিভাগ পরিচালনা করুন</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            নতুন বিভাগ
          </Button>
        </div>

        {/* Departments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.length === 0 ? (
            <div className="col-span-full bg-card rounded-xl border border-border p-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোনো বিভাগ পাওয়া যায়নি</p>
            </div>
          ) : (
            departments.map((dept) => (
              <div key={dept.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(dept)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(dept)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{dept.name}</h3>
                {dept.name_en && <p className="text-sm text-muted-foreground">{dept.name_en}</p>}
                {dept.head_name && (
                  <p className="text-sm text-muted-foreground mt-2">
                    বিভাগীয় প্রধান: {dept.head_name}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {dept.student_count || 0} শিক্ষার্থী
                  </span>
                  {!dept.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600">
                      নিষ্ক্রিয়
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDepartment ? "বিভাগ সম্পাদনা" : "নতুন বিভাগ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>নাম (বাংলা) *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="বাংলা"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>নাম (ইংরেজি)</Label>
                <Input
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="Bangla"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label>বিবরণ</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="বিভাগের বিবরণ"
                className="mt-2"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>বিভাগীয় প্রধান</Label>
                <Input
                  value={formData.head_name}
                  onChange={(e) => setFormData({ ...formData, head_name: e.target.value })}
                  placeholder="প্রধানের নাম"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>শিক্ষার্থী সংখ্যা</Label>
                <Input
                  type="number"
                  value={formData.student_count}
                  onChange={(e) => setFormData({ ...formData, student_count: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
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
                {selectedDepartment ? "আপডেট করুন" : "তৈরি করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>বিভাগ মুছে ফেলুন?</AlertDialogTitle>
            <AlertDialogDescription>
              এই কাজটি ফিরিয়ে আনা যাবে না। বিভাগটি স্থায়ীভাবে মুছে যাবে।
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

export default DepartmentsAdminPage;
