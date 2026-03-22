import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import BackgroundLayer from "../../components/background/BackgroundLayer";
import { navigate } from "../../router";
import { loginUser } from "./authUtils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const result = loginUser(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <BackgroundLayer imageUrl="/assets/image-1.png">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card-primary border-2 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="text-center space-y-4 pb-2">
            {/* Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/generated/planday-creative-icon-transparent.dim_200x200.png"
                alt="PlanDay"
                className="h-16 w-16 md:hidden"
              />
              <img
                src="/assets/generated/planday-creative-logo-transparent.dim_600x180.png"
                alt="PlanDay"
                className="hidden md:block h-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Sign in to your account
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            {error && (
              <Alert
                variant="destructive"
                className="animate-in fade-in slide-in-from-top-2 duration-300"
                data-ocid="login.error_state"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 transition-all duration-200 focus:ring-2"
                    autoComplete="email"
                    data-ocid="login.input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 transition-all duration-200 focus:ring-2"
                    autoComplete="current-password"
                    data-ocid="login.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-semibold btn-interactive shadow-lg transition-all duration-200"
                data-ocid="login.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-primary font-medium hover:underline transition-colors"
                data-ocid="login.link"
              >
                Create Account
              </button>
            </p>

            <p className="text-center text-xs text-muted-foreground pt-2">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </BackgroundLayer>
  );
}
