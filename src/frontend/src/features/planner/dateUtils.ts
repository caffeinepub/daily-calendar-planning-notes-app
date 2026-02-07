export interface CalendarDay {
  date: Date;
  dateStr: string; // ISO format YYYY-MM-DD
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function getMonthGrid(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
  const daysInMonth = lastDay.getDate();

  const grid: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Add leading days from previous month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const date = new Date(year, month, -startingDayOfWeek + i + 1);
    grid.push({
      date,
      dateStr: formatDateISO(date),
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.getTime() === today.getTime();
    grid.push({
      date,
      dateStr: formatDateISO(date),
      isCurrentMonth: true,
      isToday
    });
  }

  // Add trailing days from next month to complete the grid
  const remainingCells = 42 - grid.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    grid.push({
      date,
      dateStr: formatDateISO(date),
      isCurrentMonth: false,
      isToday: false
    });
  }

  return grid;
}

export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getMonthName(month: number): string {
  const date = new Date(2000, month, 1);
  return date.toLocaleDateString('en-US', { month: 'long' });
}
