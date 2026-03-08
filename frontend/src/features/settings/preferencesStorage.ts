type ThemePreference = 'system' | 'light' | 'dark';
type MotionPreference = 'system' | 'on' | 'off';

const THEME_KEY = 'daily-planner-theme';
const MOTION_KEY = 'daily-planner-motion';

export function getThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (error) {
    console.error('Failed to load theme preference:', error);
  }
  return 'system';
}

export function setThemePreference(theme: ThemePreference): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Failed to save theme preference:', error);
  }
}

export function getMotionPreference(): MotionPreference {
  try {
    const stored = localStorage.getItem(MOTION_KEY);
    if (stored === 'on' || stored === 'off' || stored === 'system') {
      return stored;
    }
  } catch (error) {
    console.error('Failed to load motion preference:', error);
  }
  return 'system';
}

export function setMotionPreference(motion: MotionPreference): void {
  try {
    localStorage.setItem(MOTION_KEY, motion);
  } catch (error) {
    console.error('Failed to save motion preference:', error);
  }
}

export function applyThemePreference(): void {
  const theme = getThemePreference();
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // System preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export function applyMotionPreference(): void {
  const motion = getMotionPreference();
  const root = document.documentElement;
  
  if (motion === 'on') {
    // Reduce motion even if OS allows it
    root.classList.add('reduce-motion');
  } else if (motion === 'off') {
    // Allow motion unless OS forces reduced motion
    root.classList.remove('reduce-motion');
  } else {
    // System preference - remove class and let CSS media query handle it
    root.classList.remove('reduce-motion');
  }
}
