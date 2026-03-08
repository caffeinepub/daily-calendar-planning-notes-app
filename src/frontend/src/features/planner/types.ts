export type TimeOfDay = "Morning" | "Afternoon" | "Evening";

export interface Task {
  id: string;
  text: string;
  timeOfDay: TimeOfDay;
  createdAt: number;
}

export interface DayPlan {
  date: string; // ISO date string (YYYY-MM-DD)
  tasks: Task[];
}

export interface DayPlansMap {
  [date: string]: DayPlan;
}
