import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import BackgroundLayer from "../../components/background/BackgroundLayer";
import { getMonthBackgroundUrl } from "../background/monthBackgrounds";

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({
  onNavigateToSignup,
  onLoginSuccess,
}: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentMonth = new Date().getMonth() + 1;
  const bgUrl = getMonthBackgroundUrl(currentMonth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Brief loading animation before redirecting to dashboard
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <BackgroundLayer imageUrl={bgUrl}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/planday-creative-logo-transparent.dim_600x180.png"
              alt="PlanDay"
              className="h-16 object-contain drop-shadow-lg"
            />
          </div>

          {/* Card */}
          <div
            className="rounded-2xl border border-white/10 shadow-2xl p-8"
            style={{
              background: "rgba(15, 15, 25, 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-gray-400 text-sm mb-8">
              Sign in to your PlanDay account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-300 text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                  data-ocid="login.input"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-300 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11 pr-11"
                    data-ocid="login.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    data-ocid="login.toggle"
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
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  data-ocid="login.link"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 shadow-lg transition-all duration-200"
                data-ocid="login.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

            <p className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToSignup}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                data-ocid="login.link"
              >
                <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                Create Account
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </motion.div>
      </div>
    </BackgroundLayer>
  );
}
