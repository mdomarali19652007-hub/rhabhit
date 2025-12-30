import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdmissionPage from "./pages/AdmissionPage";
import NoticePage from "./pages/NoticePage";
import AboutPage from "./pages/AboutPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import NoticesAdminPage from "./pages/admin/NoticesAdminPage";
import DepartmentsAdminPage from "./pages/admin/DepartmentsAdminPage";
import FacultyAdminPage from "./pages/admin/FacultyAdminPage";
import AdmissionsAdminPage from "./pages/admin/AdmissionsAdminPage";
import GalleryAdminPage from "./pages/admin/GalleryAdminPage";
import SettingsAdminPage from "./pages/admin/SettingsAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admission" element={<AdmissionPage />} />
              <Route path="/notices" element={<NoticePage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="notices" element={<NoticesAdminPage />} />
                <Route path="departments" element={<DepartmentsAdminPage />} />
                <Route path="faculty" element={<FacultyAdminPage />} />
                <Route path="admissions" element={<AdmissionsAdminPage />} />
                <Route path="gallery" element={<GalleryAdminPage />} />
                <Route path="settings" element={<SettingsAdminPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
