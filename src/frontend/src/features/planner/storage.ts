import type { DayPlan, DayPlansMap } from "./types";

const STORAGE_KEY = "daily-planner-data";
const STORAGE_VERSION = "1.0";

interface StorageData {
  version: string;
  dayPlans: DayPlansMap;
}

export function loadDayPlans(): DayPlansMap {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {};
    }

    const data: StorageData = JSON.parse(stored);

    // Version check for future migrations
    if (data.version !== STORAGE_VERSION) {
      console.warn("Storage version mismatch, using empty state");
      return {};
    }

    // Validate structure
    if (!data.dayPlans || typeof data.dayPlans !== "object") {
      return {};
    }

    return data.dayPlans;
  } catch (error) {
    console.error("Failed to load from LocalStorage:", error);
    return {};
  }
}

export function saveDayPlans(dayPlans: DayPlansMap): void {
  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      dayPlans,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to LocalStorage:", error);
  }
}

export function getDayPlan(
  date: string,
  dayPlans: DayPlansMap,
): DayPlan | undefined {
  return dayPlans[date];
}

export function hasTasks(date: string, dayPlans: DayPlansMap): boolean {
  const plan = dayPlans[date];
  return !!plan && plan.tasks.length > 0;
}

export function exportPlannerData(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return JSON.stringify(
        { version: STORAGE_VERSION, dayPlans: {} },
        null,
        2,
      );
    }
    return stored;
  } catch (error) {
    console.error("Failed to export planner data:", error);
    return JSON.stringify({ version: STORAGE_VERSION, dayPlans: {} }, null, 2);
  }
}

export function validateImportData(jsonString: string): {
  valid: boolean;
  data?: StorageData;
  error?: string;
} {
  try {
    const data = JSON.parse(jsonString);

    // Check version
    if (!data.version || typeof data.version !== "string") {
      return { valid: false, error: "Invalid data format: missing version" };
    }

    // Check dayPlans structure
    if (!data.dayPlans || typeof data.dayPlans !== "object") {
      return {
        valid: false,
        error: "Invalid data format: missing or invalid dayPlans",
      };
    }

    // Basic validation of dayPlans structure
    for (const [date, plan] of Object.entries(data.dayPlans)) {
      if (typeof date !== "string") {
        return { valid: false, error: "Invalid data format: invalid date key" };
      }
      if (!plan || typeof plan !== "object") {
        return {
          valid: false,
          error: "Invalid data format: invalid plan object",
        };
      }
      const dayPlan = plan as any;
      if (!Array.isArray(dayPlan.tasks)) {
        return {
          valid: false,
          error: "Invalid data format: tasks must be an array",
        };
      }
    }

    return { valid: true, data: data as StorageData };
  } catch (_error) {
    return { valid: false, error: "Invalid JSON format" };
  }
}

export function importPlannerData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to import planner data:", error);
    throw new Error("Failed to save imported data");
  }
}

export function clearPlannerData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear planner data:", error);
    throw new Error("Failed to clear data");
  }
}

export { STORAGE_KEY, STORAGE_VERSION };
