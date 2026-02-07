# Specification

## Summary
**Goal:** Improve app typography and text legibility by using a modern sans-serif web font, higher-contrast text colors, and clearer font rendering across all views.

**Planned changes:**
- Load and apply a modern sans-serif web font globally so all text uses it consistently across Login, Calendar, Daily, and Settings views.
- Adjust global text color tokens (foreground, muted-foreground, card-foreground) to increase contrast and readability on glassmorphism cards and over background images in both light and dark themes.
- Add global font rendering enhancements (e.g., font-smoothing/antialiasing) at the document/body level to improve perceived text clarity without changing any app behavior.

**User-visible outcome:** Text throughout the app appears brighter, clearer, and more readable (including muted labels and helper text) while the app’s content, behavior, and animations remain unchanged.
