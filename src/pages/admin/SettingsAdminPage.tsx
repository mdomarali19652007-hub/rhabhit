import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SiteSettings {
  college_history?: string;
  mission?: string;
  vision?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_address?: string;
  facebook_url?: string;
  youtube_url?: string;
}

const SettingsAdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({});

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      toast.error("সেটিংস লোড করতে সমস্যা হয়েছে");
    } else {
      const settingsObj: SiteSettings = {};
      data?.forEach((item) => {
        settingsObj[item.key as keyof SiteSettings] = item.value as string;
      });
      setSettings(settingsObj);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: value || "",
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key: update.key, value: update.value },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      toast.success("সেটিংস সংরক্ষিত হয়েছে");
    } catch (error) {
      toast.error("সংরক্ষণ করতে সমস্যা হয়েছে");
    }

    setSaving(false);
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
        <title>সেটিংস | অ্যাডমিন প্যানেল</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">সাইট সেটিংস</h1>
            <p className="text-muted-foreground mt-1">ওয়েবসাইটের তথ্য ও সেটিংস পরিচালনা করুন</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </Button>
        </div>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList>
            <TabsTrigger value="about">কলেজ সম্পর্কে</TabsTrigger>
            <TabsTrigger value="contact">যোগাযোগ</TabsTrigger>
            <TabsTrigger value="social">সোশ্যাল মিডিয়া</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">কলেজের তথ্য</h2>
                  <p className="text-sm text-muted-foreground">কলেজের ইতিহাস, মিশন ও ভিশন</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>কলেজের ইতিহাস</Label>
                  <Textarea
                    value={settings.college_history || ""}
                    onChange={(e) => updateSetting("college_history", e.target.value)}
                    placeholder="কলেজের ইতিহাস লিখুন..."
                    className="mt-2"
                    rows={6}
                  />
                </div>
                <div>
                  <Label>মিশন</Label>
                  <Textarea
                    value={settings.mission || ""}
                    onChange={(e) => updateSetting("mission", e.target.value)}
                    placeholder="কলেজের মিশন লিখুন..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>ভিশন</Label>
                  <Textarea
                    value={settings.vision || ""}
                    onChange={(e) => updateSetting("vision", e.target.value)}
                    placeholder="কলেজের ভিশন লিখুন..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">যোগাযোগের তথ্য</h2>
                  <p className="text-sm text-muted-foreground">ফোন, ইমেইল ও ঠিকানা</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>ফোন নম্বর</Label>
                  <Input
                    value={settings.contact_phone || ""}
                    onChange={(e) => updateSetting("contact_phone", e.target.value)}
                    placeholder="+880 1XXX XXXXXX"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>ইমেইল</Label>
                  <Input
                    value={settings.contact_email || ""}
                    onChange={(e) => updateSetting("contact_email", e.target.value)}
                    placeholder="info@college.edu.bd"
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>ঠিকানা</Label>
                  <Textarea
                    value={settings.contact_address || ""}
                    onChange={(e) => updateSetting("contact_address", e.target.value)}
                    placeholder="কলেজের সম্পূর্ণ ঠিকানা"
                    className="mt-2"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">সোশ্যাল মিডিয়া</h2>
                  <p className="text-sm text-muted-foreground">সোশ্যাল মিডিয়া লিংক</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>ফেসবুক পেজ</Label>
                  <Input
                    value={settings.facebook_url || ""}
                    onChange={(e) => updateSetting("facebook_url", e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>ইউটিউব চ্যানেল</Label>
                  <Input
                    value={settings.youtube_url || ""}
                    onChange={(e) => updateSetting("youtube_url", e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsAdminPage;
