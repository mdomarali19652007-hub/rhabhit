import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, Check, X, GraduationCap, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

type Admission = Tables<"admissions">;

const AdmissionsAdminPage = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [adminNotes, setAdminNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAdmissions = async () => {
    const { data, error } = await supabase
      .from("admissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("আবেদন লোড করতে সমস্যা হয়েছে");
    } else {
      setAdmissions(data || []);
      setFilteredAdmissions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  useEffect(() => {
    let filtered = admissions;

    if (statusFilter !== "all") {
      filtered = filtered.filter(a => a.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.student_name.toLowerCase().includes(query) ||
        a.application_number.toLowerCase().includes(query) ||
        a.phone.includes(query)
      );
    }

    setFilteredAdmissions(filtered);
  }, [searchQuery, statusFilter, admissions]);

  const openViewDialog = (admission: Admission) => {
    setSelectedAdmission(admission);
    setViewDialogOpen(true);
  };

  const openActionDialog = (admission: Admission, type: "approve" | "reject") => {
    setSelectedAdmission(admission);
    setActionType(type);
    setAdminNotes("");
    setActionDialogOpen(true);
  };

  const handleAction = async () => {
    if (!selectedAdmission) return;

    const { error } = await supabase
      .from("admissions")
      .update({
        status: actionType === "approve" ? "approved" : "rejected",
        admin_notes: adminNotes.trim() || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", selectedAdmission.id);

    if (error) {
      toast.error("আপডেট করতে সমস্যা হয়েছে");
    } else {
      toast.success(actionType === "approve" ? "আবেদন অনুমোদিত হয়েছে" : "আবেদন বাতিল করা হয়েছে");
      setActionDialogOpen(false);
      fetchAdmissions();
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600">অনুমোদিত</span>;
      case "rejected":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-600">বাতিল</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600">অপেক্ষমান</span>;
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
        <title>ভর্তি আবেদন | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">ভর্তি আবেদন</h1>
          <p className="text-muted-foreground mt-1">সকল ভর্তি আবেদন পর্যালোচনা ও পরিচালনা করুন</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম, আবেদন নম্বর বা ফোন দিয়ে খুঁজুন..."
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব আবেদন</SelectItem>
              <SelectItem value="pending">অপেক্ষমান</SelectItem>
              <SelectItem value="approved">অনুমোদিত</SelectItem>
              <SelectItem value="rejected">বাতিল</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Admissions List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {filteredAdmissions.length === 0 ? (
            <div className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোনো আবেদন পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">আবেদন নম্বর</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">নাম</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">বিভাগ</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">ফোন</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAdmissions.map((admission) => (
                    <tr key={admission.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{admission.application_number}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{admission.student_name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{admission.desired_department || "-"}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{admission.phone}</td>
                      <td className="px-4 py-3">{getStatusBadge(admission.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openViewDialog(admission)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          {admission.status === "pending" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => openActionDialog(admission, "approve")}
                                className="text-emerald-600 hover:text-emerald-700"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => openActionDialog(admission, "reject")}
                                className="text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>আবেদনের বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">আবেদন নম্বর</p>
                  <p className="font-semibold text-foreground">{selectedAdmission.application_number}</p>
                </div>
                {getStatusBadge(selectedAdmission.status)}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">শিক্ষার্থীর নাম</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.student_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">পিতার নাম</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.father_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">মাতার নাম</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.mother_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">জন্ম তারিখ</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.date_of_birth}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">লিঙ্গ</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.gender}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">মোবাইল</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">ইমেইল</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.email || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">কাঙ্ক্ষিত বিভাগ</Label>
                  <p className="font-medium text-foreground">{selectedAdmission.desired_department || "-"}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">বর্তমান ঠিকানা</Label>
                <p className="font-medium text-foreground">{selectedAdmission.present_address}</p>
              </div>

              {selectedAdmission.ssc_roll && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">এসএসসি তথ্য</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">রোল</p>
                      <p className="font-medium">{selectedAdmission.ssc_roll}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">বোর্ড</p>
                      <p className="font-medium">{selectedAdmission.ssc_board}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">বছর</p>
                      <p className="font-medium">{selectedAdmission.ssc_year}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">জিপিএ</p>
                      <p className="font-medium">{selectedAdmission.ssc_gpa}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedAdmission.admin_notes && (
                <div className="p-4 bg-amber-500/10 rounded-lg">
                  <Label className="text-amber-700">অ্যাডমিন মন্তব্য</Label>
                  <p className="text-foreground mt-1">{selectedAdmission.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation */}
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "আবেদন অনুমোদন করুন?" : "আবেদন বাতিল করুন?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "approve" 
                ? "এই আবেদনটি অনুমোদন করা হবে।" 
                : "এই আবেদনটি বাতিল করা হবে।"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label>মন্তব্য (ঐচ্ছিক)</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="কোনো মন্তব্য থাকলে লিখুন..."
              className="mt-2"
              rows={3}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAction}
              className={actionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive"}
            >
              {actionType === "approve" ? "অনুমোদন করুন" : "বাতিল করুন"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdmissionsAdminPage;
