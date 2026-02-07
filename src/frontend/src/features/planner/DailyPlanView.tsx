import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DayPlan, TimeOfDay } from './types';
import TaskItem from './TaskItem';
import { formatDateForDisplay } from './dateUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DailyPlanViewProps {
  selectedDate: string;
  dayPlan?: DayPlan;
  onAddTask: (date: string, text: string, timeOfDay: TimeOfDay) => void;
  onUpdateTask: (date: string, taskId: string, newText: string) => void;
  onDeleteTask: (date: string, taskId: string) => void;
}

export default function DailyPlanView({
  selectedDate,
  dayPlan,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: DailyPlanViewProps) {
  const [newTaskInputs, setNewTaskInputs] = useState<Record<TimeOfDay, string>>({
    Morning: '',
    Afternoon: '',
    Evening: '',
  });

  const handleAddTask = (timeOfDay: TimeOfDay) => {
    const text = newTaskInputs[timeOfDay].trim();
    if (text) {
      onAddTask(selectedDate, text, timeOfDay);
      setNewTaskInputs(prev => ({ ...prev, [timeOfDay]: '' }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, timeOfDay: TimeOfDay) => {
    if (e.key === 'Enter') {
      handleAddTask(timeOfDay);
    }
  };

  const sections: { timeOfDay: TimeOfDay; label: string; emoji: string }[] = [
    { timeOfDay: 'Morning', label: 'Morning', emoji: '🌅' },
    { timeOfDay: 'Afternoon', label: 'Afternoon', emoji: '☀️' },
    { timeOfDay: 'Evening', label: 'Evening', emoji: '🌙' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Date Header */}
      <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 rounded-2xl p-6 text-center border-2 border-border shadow-lg backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-foreground">
          {formatDateForDisplay(selectedDate)}
        </h2>
      </div>

      {/* Time of Day Sections */}
      <div className="space-y-6">
        {sections.map(({ timeOfDay, label, emoji }, index) => {
          const tasks = dayPlan?.tasks.filter(task => task.timeOfDay === timeOfDay) || [];
          return (
            <div
              key={timeOfDay}
              className="section-entrance bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b-2 border-border">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  {label}
                </h3>
              </div>

              {/* Tasks List */}
              <div className="p-6 space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4 italic">
                    No tasks yet. Add one below!
                  </p>
                ) : (
                  tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={(text) => onUpdateTask(selectedDate, task.id, text)}
                      onDelete={() => onDeleteTask(selectedDate, task.id)}
                    />
                  ))
                )}

                {/* Add Task Input */}
                <div className="flex gap-2 pt-2">
                  <Input
                    type="text"
                    placeholder={`Add a task for ${label.toLowerCase()}...`}
                    value={newTaskInputs[timeOfDay]}
                    onChange={(e) =>
                      setNewTaskInputs(prev => ({ ...prev, [timeOfDay]: e.target.value }))
                    }
                    onKeyPress={(e) => handleKeyPress(e, timeOfDay)}
                    className="task-input flex-1 bg-background/60 border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Button
                    onClick={() => handleAddTask(timeOfDay)}
                    disabled={!newTaskInputs[timeOfDay].trim()}
                    className="btn-interactive transition-all duration-200 active:scale-95"
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
