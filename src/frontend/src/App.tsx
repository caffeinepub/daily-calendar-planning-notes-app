import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import ViewTransition from "./components/animations/ViewTransition";
import BackgroundLayer from "./components/background/BackgroundLayer";
import LoginScreen from "./features/auth/LoginScreen";
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
import { useInternetIdentity } from "./hooks/useInternetIdentity";

type View = "calendar" | "daily" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("calendar");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "back"
  >("forward");
  const [displayedMonth, setDisplayedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [_displayedYear, setDisplayedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const { dayPlans, addTask, updateTask, deleteTask, loadFromStorage } =
    usePlannerStore();
  const { identity, clear, isInitializing } = useInternetIdentity();

  // Check if user is authenticated (identity exists and is not anonymous)
  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  // Load data from LocalStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Apply persisted preferences on mount
  useEffect(() => {
    applyThemePreference();
    applyMotionPreference();
  }, []);

  // Determine background image based on current view
  const getBackgroundImage = (): string => {
    if (currentView === "calendar") {
      // Use the displayed month from calendar navigation
      return getMonthBackgroundUrl(displayedMonth + 1); // +1 because displayedMonth is 0-indexed
    }
    if (currentView === "daily" && selectedDate) {
      // Use the month from the selected date
      const date = new Date(`${selectedDate}T00:00:00`);
      return getBackgroundUrlForDate(date);
    }
    // Settings view: use current date's month
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
    clear();
  };

  const handleMonthChange = (year: number, month: number) => {
    setDisplayedYear(year);
    setDisplayedMonth(month);
  };

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CalendarIcon className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <BackgroundLayer imageUrl={getBackgroundImage()}>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/planday-creative-logo-transparent.dim_600x180.png"
                  alt="PlanDay"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                {currentView === "daily" && selectedDate && (
                  <Button
                    onClick={handleBackToCalendar}
                    variant="secondary"
                    className="btn-interactive"
                    aria-label="Back to calendar"
                    data-ocid="nav.secondary_button"
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
                    data-ocid="nav.secondary_button"
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
                    data-ocid="nav.settings_button"
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
                  data-ocid="nav.secondary_button"
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
              {currentView === "settings" && (
                <ProfileView identity={identity} />
              )}
            </div>
          </ViewTransition>
        </main>

        <footer className="border-t border-border mt-16 py-6 bg-card/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
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
