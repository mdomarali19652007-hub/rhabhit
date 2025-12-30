import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image } from "lucide-react";
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

type Gallery = Tables<"gallery">;

const categories = [
  { value: "general", label: "সাধারণ" },
  { value: "event", label: "অনুষ্ঠান" },
  { value: "campus", label: "ক্যাম্পাস" },
  { value: "sports", label: "খেলাধুলা" },
  { value: "cultural", label: "সাংস্কৃতিক" },
];

const GalleryAdminPage = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "general",
    is_published: true,
    display_order: 0,
  });

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("গ্যালারি লোড করতে সমস্যা হয়েছে");
    } else {
      setGallery(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "general",
      is_published: true,
      display_order: gallery.length,
    });
    setSelectedItem(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (item: Gallery) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
      category: item.category || "general",
      is_published: item.is_published ?? true,
      display_order: item.display_order || 0,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (item: Gallery) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.image_url.trim()) {
      toast.error("শিরোনাম এবং ছবির লিংক আবশ্যক");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      image_url: formData.image_url.trim(),
      category: formData.category,
      is_published: formData.is_published,
      display_order: formData.display_order,
    };

    if (selectedItem) {
      const { error } = await supabase
        .from("gallery")
        .update(payload)
        .eq("id", selectedItem.id);

      if (error) {
        toast.error("ছবি আপডেট করতে সমস্যা হয়েছে");
      } else {
        toast.success("ছবি আপডেট হয়েছে");
        setDialogOpen(false);
        fetchGallery();
      }
    } else {
      const { error } = await supabase.from("gallery").insert([payload]);

      if (error) {
        toast.error("ছবি যোগ করতে সমস্যা হয়েছে");
      } else {
        toast.success("ছবি যোগ হয়েছে");
        setDialogOpen(false);
        fetchGallery();
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", selectedItem.id);

    if (error) {
      toast.error("ছবি মুছতে সমস্যা হয়েছে");
    } else {
      toast.success("ছবি মুছে ফেলা হয়েছে");
      setDeleteDialogOpen(false);
      fetchGallery();
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
        <title>গ্যালারি ব্যবস্থাপনা | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">গ্যালারি ব্যবস্থাপনা</h1>
            <p className="text-muted-foreground mt-1">ফটো গ্যালারি পরিচালনা করুন</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            নতুন ছবি
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gallery.length === 0 ? (
            <div className="col-span-full bg-card rounded-xl border border-border p-12 text-center">
              <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোনো ছবি পাওয়া যায়নি</p>
            </div>
          ) : (
            gallery.map((item) => (
              <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group">
                <div className="aspect-video relative bg-muted">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" onClick={() => openDeleteDialog(item)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  {!item.is_published && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-amber-500/90 text-white">
                      অপ্রকাশিত
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-foreground text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {categories.find(c => c.value === item.category)?.label || "সাধারণ"}
                  </p>
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
            <DialogTitle>{selectedItem ? "ছবি সম্পাদনা" : "নতুন ছবি"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>শিরোনাম *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ছবির শিরোনাম"
                className="mt-2"
              />
            </div>
            <div>
              <Label>ছবির লিংক *</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                className="mt-2"
              />
              {formData.image_url && (
                <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={formData.image_url} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <Label>বিবরণ</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="ছবির বিবরণ"
                className="mt-2"
                rows={2}
              />
            </div>
            <div>
              <Label>ক্যাটাগরি</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
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
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.is_published}
                onCheckedChange={(v) => setFormData({ ...formData, is_published: v })}
              />
              <Label>প্রকাশিত</Label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit">
                {selectedItem ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ছবি মুছে ফেলুন?</AlertDialogTitle>
            <AlertDialogDescription>
              এই কাজটি ফিরিয়ে আনা যাবে না। ছবিটি স্থায়ীভাবে মুছে যাবে।
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

export default GalleryAdminPage;
