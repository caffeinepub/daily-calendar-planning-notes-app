import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import BackgroundLayer from "../../components/background/BackgroundLayer";
import { useAuth } from "../../hooks/useAuth";
import { getMonthBackgroundUrl } from "../background/monthBackgrounds";

interface SignupPageProps {
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
}

export default function SignupPage({
  onNavigateToLogin,
  onSignupSuccess,
}: SignupPageProps) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentMonth = new Date().getMonth() + 1;
  const bgUrl = getMonthBackgroundUrl(currentMonth);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    const result = await signup(name.trim(), email.trim(), password);
    setIsLoading(false);
    if (result.success) {
      onSignupSuccess();
    } else {
      setErrors({ form: result.error || "Signup failed" });
    }
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
            <h1 className="text-3xl font-bold text-white mb-1">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Join PlanDay to start organizing your day
            </p>

            {errors.form && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-400"
                data-ocid="signup.error_state"
              >
                {errors.form}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-gray-300 text-sm font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                  data-ocid="signup.input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="signup.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-email"
                  className="text-gray-300 text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                  data-ocid="signup.input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="signup.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-password"
                  className="text-gray-300 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11 pr-11"
                    data-ocid="signup.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    data-ocid="signup.toggle"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="signup.error_state"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirm-password"
                  className="text-gray-300 text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-11 pr-11"
                    data-ocid="signup.input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    data-ocid="signup.toggle"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    className="text-xs text-red-400"
                    data-ocid="signup.error_state"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 shadow-lg transition-all duration-200"
                  data-ocid="signup.submit_button"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                data-ocid="signup.link"
              >
                Sign In
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
