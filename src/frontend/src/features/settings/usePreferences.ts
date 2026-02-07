import { useState, useEffect } from 'react';
import {
  getThemePreference,
  setThemePreference,
  getMotionPreference,
  setMotionPreference,
  applyThemePreference,
  applyMotionPreference
} from './preferencesStorage';

type ThemePreference = 'system' | 'light' | 'dark';
type MotionPreference = 'system' | 'on' | 'off';

export function usePreferences() {
  const [theme, setTheme] = useState<ThemePreference>(getThemePreference());
  const [motion, setMotion] = useState<MotionPreference>(getMotionPreference());

  useEffect(() => {
    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyThemePreference();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const updateTheme = (newTheme: ThemePreference) => {
    setTheme(newTheme);
    setThemePreference(newTheme);
    applyThemePreference();
  };

  const updateMotion = (newMotion: MotionPreference) => {
    setMotion(newMotion);
    setMotionPreference(newMotion);
    applyMotionPreference();
  };

  return {
    theme,
    motion,
    updateTheme,
    updateMotion
  };
}
