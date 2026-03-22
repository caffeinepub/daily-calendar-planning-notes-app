import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Settings } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ViewTransition from "./components/animations/ViewTransition";
import BackgroundLayer from "./components/background/BackgroundLayer";
import LoginPage from "./features/auth/LoginPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import SignupPage from "./features/auth/SignupPage";
import { getCurrentUser, logoutUser } from "./features/auth/authUtils";
import {
  getBackgroundUrlForDate,
  getMonthBackgroundUrl,
} from "./features/background/monthBackgrounds";
import DailyPlanView from "./features/planner/DailyPlanView";
import MonthlyCalendarView from "./features/planner/MonthlyCalendarView";
import { usePlannerStore } from "./features/planner/usePlannerStore";
import ProfileView from "./features/profile/ProfileView";
import {
  applyMotionPreference,
  applyThemePreference,
} from "./features/settings/preferencesStorage";
import { ROUTE_CHANGE_EVENT, getPath, navigate } from "./router";

type PlannerView = "calendar" | "daily" | "settings";

function DashboardApp() {
  const [currentView, setCurrentView] = useState<PlannerView>("calendar");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "back"
  >("forward");
  const [displayedMonth, setDisplayedMonth] = useState<number>(
    new Date().getMonth(),
  );

  const { dayPlans, addTask, updateTask, deleteTask, loadFromStorage } =
    usePlannerStore();
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    applyThemePreference();
    applyMotionPreference();
  }, []);

  const getBackgroundImage = (): string => {
    if (currentView === "calendar") {
      return getMonthBackgroundUrl(displayedMonth + 1);
    }
    if (currentView === "daily" && selectedDate) {
      const date = new Date(`${selectedDate}T00:00:00`);
      return getBackgroundUrlForDate(date);
    }
    return getBackgroundUrlForDate(new Date());
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setTransitionDirection("forward");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("daily");
      setIsTransitioning(false);
    }, 150);
  };

  const handleBackToCalendar = () => {
    setTransitionDirection("back");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("calendar");
      setSelectedDate(null);
      setIsTransitioning(false);
    }, 150);
  };

  const handleOpenSettings = () => {
    setTransitionDirection("forward");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("settings");
      setIsTransitioning(false);
    }, 150);
  };

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
  };

  const handleMonthChange = (_year: number, month: number) => {
    setDisplayedMonth(month);
  };

  return (
    <BackgroundLayer imageUrl={getBackgroundImage()}>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/planday-creative-icon-transparent.dim_200x200.png"
                  alt="PlanDay"
                  className="w-8 h-8 md:hidden"
                />
                <img
                  src="/assets/generated/planday-creative-logo-transparent.dim_600x180.png"
                  alt="PlanDay"
                  className="hidden md:block h-9 object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                {currentUser && (
                  <span className="hidden sm:inline text-sm text-muted-foreground mr-1">
                    Hi,{" "}
                    <strong className="text-foreground">
                      {currentUser.name}
                    </strong>
                  </span>
                )}
                {currentView === "daily" && selectedDate && (
                  <Button
                    onClick={handleBackToCalendar}
                    variant="secondary"
                    className="btn-interactive"
                    aria-label="Back to calendar"
                    data-ocid="dashboard.secondary_button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Back to Calendar</span>
                  </Button>
                )}
                {currentView === "settings" && (
                  <Button
                    onClick={handleBackToCalendar}
                    variant="secondary"
                    className="btn-interactive"
                    aria-label="Back to calendar"
                    data-ocid="dashboard.secondary_button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Back to Planner</span>
                  </Button>
                )}
                {currentView !== "settings" && (
                  <Button
                    onClick={handleOpenSettings}
                    variant="outline"
                    className="btn-interactive"
                    aria-label="Open settings"
                    data-ocid="dashboard.button"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="btn-interactive"
                  aria-label="Sign out"
                  data-ocid="dashboard.delete_button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <ViewTransition viewKey={currentView} direction={transitionDirection}>
            <div
              className={`transition-opacity duration-150 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              {currentView === "calendar" && (
                <MonthlyCalendarView
                  onDateSelect={handleDateSelect}
                  dayPlans={dayPlans}
                  onMonthChange={handleMonthChange}
                />
              )}
              {currentView === "daily" && selectedDate && (
                <DailyPlanView
                  selectedDate={selectedDate}
                  dayPlan={dayPlans[selectedDate]}
                  onAddTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              )}
              {currentView === "settings" && <ProfileView identity={null} />}
            </div>
          </ViewTransition>
        </main>

        <footer className="border-t border-border mt-16 py-6 bg-card/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
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
          </div>
        </footer>
      </div>
    </BackgroundLayer>
  );
}

export default function App() {
  const [path, setPath] = useState(getPath);

  const handleRouteChange = useCallback(() => {
    setPath(getPath());
  }, []);

  useEffect(() => {
    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [handleRouteChange]);

  if (path === "/login") {
    return <LoginPage />;
  }
  if (path === "/signup") {
    return <SignupPage />;
  }
  return (
    <ProtectedRoute>
      <DashboardApp />
    </ProtectedRoute>
  );
}
