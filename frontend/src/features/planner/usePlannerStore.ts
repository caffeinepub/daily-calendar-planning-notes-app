import { useState, useCallback } from 'react';
import { DayPlansMap, DayPlan, Task, TimeOfDay } from './types';
import { loadDayPlans, saveDayPlans } from './storage';

export function usePlannerStore() {
  const [dayPlans, setDayPlans] = useState<DayPlansMap>({});

  const loadFromStorage = useCallback(() => {
    const loaded = loadDayPlans();
    setDayPlans(loaded);
  }, []);

  const saveToStorage = useCallback((plans: DayPlansMap) => {
    saveDayPlans(plans);
  }, []);

  const addTask = useCallback((date: string, text: string, timeOfDay: TimeOfDay) => {
    setDayPlans(prev => {
      const newTask: Task = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        timeOfDay,
        createdAt: Date.now()
      };

      const existingPlan = prev[date];
      const updatedPlan: DayPlan = existingPlan
        ? { ...existingPlan, tasks: [...existingPlan.tasks, newTask] }
        : { date, tasks: [newTask] };

      const updated = { ...prev, [date]: updatedPlan };
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const updateTask = useCallback((date: string, taskId: string, newText: string) => {
    setDayPlans(prev => {
      const plan = prev[date];
      if (!plan) return prev;

      const updatedTasks = plan.tasks.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      );

      const updated = { ...prev, [date]: { ...plan, tasks: updatedTasks } };
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const deleteTask = useCallback((date: string, taskId: string) => {
    setDayPlans(prev => {
      const plan = prev[date];
      if (!plan) return prev;

      const updatedTasks = plan.tasks.filter(task => task.id !== taskId);
      
      if (updatedTasks.length === 0) {
        // Remove the day plan if no tasks remain
        const { [date]: _, ...rest } = prev;
        saveToStorage(rest);
        return rest;
      }

      const updated = { ...prev, [date]: { ...plan, tasks: updatedTasks } };
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const replacePlannerData = useCallback((newDayPlans: DayPlansMap) => {
    setDayPlans(newDayPlans);
    saveToStorage(newDayPlans);
  }, [saveToStorage]);

  const clearAllData = useCallback(() => {
    setDayPlans({});
    saveToStorage({});
  }, [saveToStorage]);

  return {
    dayPlans,
    addTask,
    updateTask,
    deleteTask,
    loadFromStorage,
    replacePlannerData,
    clearAllData
  };
}
