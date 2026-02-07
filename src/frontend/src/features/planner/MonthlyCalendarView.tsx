import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthGrid, getMonthName, CalendarDay } from './dateUtils';
import { DayPlansMap } from './types';
import { hasTasks } from './storage';

interface MonthlyCalendarViewProps {
  onDateSelect: (dateStr: string) => void;
  dayPlans: DayPlansMap;
  onMonthChange?: (year: number, month: number) => void;
}

export default function MonthlyCalendarView({ onDateSelect, dayPlans, onMonthChange }: MonthlyCalendarViewProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const grid = getMonthGrid(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setTransitionDirection('left');
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    if (onMonthChange) {
      onMonthChange(newYear, newMonth);
    }
  };

  const handleNextMonth = () => {
    setTransitionDirection('right');
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    if (onMonthChange) {
      onMonthChange(newYear, newMonth);
    }
  };

  const handleDayClick = (dateStr: string) => {
    setSelectedDay(dateStr);
    setTimeout(() => {
      onDateSelect(dateStr);
      setSelectedDay(null);
    }, 300);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-border shadow-lg">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-accent/20 active:bg-accent/30 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-accent/20 active:bg-accent/30 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div 
        className={`bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-border shadow-lg ${
          transitionDirection === 'left' ? 'month-transition-left' : 
          transitionDirection === 'right' ? 'month-transition-right' : ''
        }`}
        onAnimationEnd={() => setTransitionDirection(null)}
      >
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {grid.map((day: CalendarDay) => {
            const dayHasTasks = hasTasks(day.dateStr, dayPlans);
            const isSelected = selectedDay === day.dateStr;
            
            return (
              <button
                key={day.dateStr}
                onClick={() => handleDayClick(day.dateStr)}
                disabled={isSelected}
                className={`
                  relative aspect-square rounded-xl p-2 sm:p-3 transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${day.isCurrentMonth 
                    ? 'bg-background/60 hover:bg-accent/30 active:bg-accent/40 text-foreground font-medium' 
                    : 'bg-muted/30 text-muted-foreground/50'
                  }
                  ${day.isToday 
                    ? 'ring-2 ring-primary bg-primary/10 hover:bg-primary/20 active:bg-primary/30' 
                    : ''
                  }
                  ${isSelected ? 'day-selected' : ''}
                  ${day.isCurrentMonth ? 'day-pressable' : ''}
                `}
                aria-label={`Select ${day.dateStr}`}
              >
                <span className="text-sm sm:text-base">
                  {day.date.getDate()}
                </span>
                {dayHasTasks && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
