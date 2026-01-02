import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/animations/PageTransition";
import API from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: formData.email, password: formData.password }),
  });

  const data = await res.json();

  // ✅ HANDLE BACKEND ERRORS PROPERLY
  if (!res.ok) {
    alert(data.msg || "Login failed");
    return;
  }

  // ✅ SAVE DATA
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("userName", data.user.name);
  localStorage.setItem("email", data.user.email);

  // ✅ ROLE-BASED REDIRECT
  navigate(
    data.user.role === "counsellor"
      ? "/counsellor-dashboard"
      : "/dashboard"
  );

} catch (err) {
  console.error("LOGIN ERROR:", err);
  alert("Unable to connect to server");
}

};

useEffect(() => {
  const role = localStorage.getItem("role");
  if (role !== "counsellor") {
    navigate("/login");
  }
}, [navigate]);


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage-light rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender-light rounded-full blur-3xl opacity-50" />
      </div>

      <FadeIn className="w-full max-w-md relative z-10">
        <Card variant="elevated" className="backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <Link to="/" className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage to-teal flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
            </Link>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your mental health journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@university.edu"
                    className="pl-12"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-sage hover:text-sage-dark font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/counsellor-login"
                className="text-sm text-muted-foreground hover:text-sage"
              >
                Are you a counsellor? Login here →
              </Link>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Login;
