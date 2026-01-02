import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CounsellorLogin from "./pages/CounsellorLogin";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import BookAppointment from "./pages/BookAppointment";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/counsellor-login" element={<CounsellorLogin />} />
            <Route path="/appointments" element={<Appointments />} />


            {/* ================= STUDENT PROTECTED ROUTES ================= */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book-appointment"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            {/* ================= COUNSELLOR PROTECTED ROUTES ================= */}
            <Route
              path="/counsellor-dashboard"
              element={
                <ProtectedRoute>
                  <CounsellorDashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
