import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Identity } from "@dfinity/agent";
import {
  Bell,
  CalendarIcon,
  Database,
  Download,
  Palette,
  Shield,
  Trash2,
  Upload,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  clearPlannerData,
  exportPlannerData,
  importPlannerData,
  validateImportData,
} from "../planner/storage";
import { usePlannerStore } from "../planner/usePlannerStore";
import { usePreferences } from "../settings/usePreferences";

interface ProfileViewProps {
  identity: Identity | null;
}

export default function ProfileView({ identity }: ProfileViewProps) {
  const principal = identity?.getPrincipal().toString() || "Not available";
  const { theme, motion, updateTheme, updateMotion } = usePreferences();
  const { replacePlannerData, clearAllData } = usePlannerStore();
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportPlannerData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daily-planner-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    try {
      const text = await file.text();
      const validation = validateImportData(text);

      if (!validation.valid) {
        setImportError(validation.error || "Invalid file format");
        return;
      }

      if (validation.data) {
        importPlannerData(validation.data);
        replacePlannerData(validation.data.dayPlans);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      }
    } catch (_error) {
      setImportError("Failed to read file");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearData = () => {
    clearPlannerData();
    clearAllData();
  };

  return (
    <div className="max-w-4xl mx-auto settings-entrance">
      <Card className="shadow-xl border-2">
        <CardHeader className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl">Settings</CardTitle>
              <CardDescription className="text-base mt-1">
                Manage your account, preferences, and data
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-8">
          {/* Account Section */}
          <section className="settings-section space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Account</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Your Principal ID:
              </p>
              <p className="text-sm font-mono bg-background px-3 py-2 rounded border break-all">
                {principal}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This is your unique identifier on the Internet Computer network.
              </p>
            </div>
          </section>

          <Separator />

          {/* Preferences Section */}
          <section
            className="settings-section space-y-6"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Preferences</h3>
            </div>

            {/* Theme Preference */}
            <div className="space-y-3">
              <Label htmlFor="theme-select" className="text-base font-medium">
                Theme
              </Label>
              <Select
                value={theme}
                onValueChange={(value) => updateTheme(value as any)}
              >
                <SelectTrigger
                  id="theme-select"
                  className="settings-control w-full sm:w-64 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color theme
              </p>
            </div>

            {/* Motion Preference */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <Label
                  htmlFor="motion-select"
                  className="text-base font-medium"
                >
                  Animations
                </Label>
              </div>
              <Select
                value={motion}
                onValueChange={(value) => updateMotion(value as any)}
              >
                <SelectTrigger
                  id="motion-select"
                  className="settings-control w-full sm:w-64 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="off">On</SelectItem>
                  <SelectItem value="on">Reduced</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Control animation and motion effects
              </p>
            </div>

            {/* Notifications Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <Label className="text-base font-medium">Notifications</Label>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                <p className="text-sm text-muted-foreground">
                  Browser notifications are not currently enabled for this
                  application. All your planner data is stored locally and
                  accessible anytime you visit.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Data Management Section */}
          <section
            className="settings-section space-y-6"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Data Management</h3>
            </div>

            {/* Data Storage Info */}
            <div className="bg-accent/20 rounded-lg p-4 border border-accent/30">
              <p className="text-sm leading-relaxed">
                <strong>Important:</strong> All your planner data (tasks, notes,
                and schedules) is stored locally in your browser's storage. This
                means:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-sm text-muted-foreground ml-2">
                <li>Your data is private and never leaves your device</li>
                <li>Data is specific to this browser and device</li>
                <li>
                  Clearing browser data will remove your planner information
                </li>
                <li>
                  Your data won't sync across different browsers or devices
                </li>
              </ul>
            </div>

            {/* Import/Export/Clear Actions */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="settings-action-btn transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="settings.secondary_button"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>

                <Button
                  onClick={handleImport}
                  variant="outline"
                  className="settings-action-btn transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="settings.upload_button"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="settings-action-btn transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring"
                      data-ocid="settings.delete_button"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="settings.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete all your planner data including all tasks and
                        schedules from this browser.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        className="transition-all duration-200 hover:scale-105 active:scale-95"
                        data-ocid="settings.cancel_button"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearData}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200 hover:scale-105 active:scale-95"
                        data-ocid="settings.confirm_button"
                      >
                        Delete Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {importError && (
                <Alert variant="destructive" data-ocid="settings.error_state">
                  <AlertDescription>{importError}</AlertDescription>
                </Alert>
              )}

              {importSuccess && (
                <Alert data-ocid="settings.success_state">
                  <AlertDescription>
                    Data imported successfully!
                  </AlertDescription>
                </Alert>
              )}

              <p className="text-xs text-muted-foreground">
                Export your data to create a backup, or import a previously
                exported file to restore your planner.
              </p>
            </div>
          </section>

          <Separator />

          {/* App Info Section */}
          <section
            className="settings-section space-y-4"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">About PlanDay</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A simple and elegant daily planning application to help you
              organize your tasks throughout the day. Plan your mornings,
              afternoons, and evenings with ease.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
