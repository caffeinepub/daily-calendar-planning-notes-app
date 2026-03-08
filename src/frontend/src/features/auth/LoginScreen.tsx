import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Database,
  Fingerprint,
  Loader2,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import BackgroundLayer from "../../components/background/BackgroundLayer";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function LoginScreen() {
  const { login, loginStatus, loginError } = useInternetIdentity();

  const isLoggingIn = loginStatus === "logging-in";
  const isError = loginStatus === "loginError";

  return (
    <BackgroundLayer imageUrl="/assets/image-1.png">
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Content container */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left column - Informational content */}
            <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
              {/* Hero heading */}
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Daily Planner,
                  <br />
                  <span className="text-primary">Simplified</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                  Organize your day with a beautiful, secure planner powered by
                  the Internet Computer.
                </p>
              </div>

              {/* How it works */}
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Fingerprint className="w-5 h-5 text-primary" />
                    How it works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        No passwords required:
                      </strong>{" "}
                      Sign in securely using Internet Identity, a passwordless
                      authentication system built on blockchain technology.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        One-click access:
                      </strong>{" "}
                      Your identity is cryptographically secured and works
                      across all Internet Computer applications.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        Privacy first:
                      </strong>{" "}
                      No email, phone number, or personal information needed to
                      get started.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data & Privacy */}
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Database className="w-5 h-5 text-accent" />
                    Data & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        Local storage:
                      </strong>{" "}
                      All your planner data is stored directly in your browser's
                      local storage—nothing is sent to external servers.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        Your device, your data:
                      </strong>{" "}
                      Tasks, plans, and schedules remain on your device and are
                      never shared or analyzed.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong className="text-foreground">
                        Complete control:
                      </strong>{" "}
                      You can clear your data anytime from your browser
                      settings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Getting Started */}
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Zap className="w-5 h-5 text-primary" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p>
                      <strong className="text-foreground">Sign in:</strong>{" "}
                      Click the button to create or connect your Internet
                      Identity.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p>
                      <strong className="text-foreground">
                        View your calendar:
                      </strong>{" "}
                      Browse months and select any day to start planning.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p>
                      <strong className="text-foreground">Add tasks:</strong>{" "}
                      Organize your day into Morning, Afternoon, and Evening
                      sections with custom tasks.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p>
                      <strong className="text-foreground">
                        Stay productive:
                      </strong>{" "}
                      Check off completed tasks and watch your progress
                      throughout the day.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Glassmorphism login card */}
            <div className="lg:col-span-5 flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-700">
              <Card className="w-full max-w-md glass-card-primary border-2 shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                      Welcome
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      Sign in to access your daily planner
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-2">
                  {isError && loginError && (
                    <Alert
                      variant="destructive"
                      className="animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                      <AlertDescription>
                        {loginError.message ||
                          "Failed to sign in. Please try again."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={login}
                    disabled={isLoggingIn}
                    className="w-full h-14 text-base font-semibold btn-interactive shadow-lg"
                    size="lg"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Sign in with Internet Identity
                      </>
                    )}
                  </Button>

                  <div className="pt-4 space-y-2 border-t border-border/50">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      <span>Secure blockchain authentication</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Database className="w-3 h-3" />
                      <span>Data stored locally on your device</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                  © 2026. Built with ❤️ using{" "}
                  <a
                    href="https://caffeine.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    caffeine.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayer>
  );
}
