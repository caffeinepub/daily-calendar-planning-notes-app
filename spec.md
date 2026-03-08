# Specification

## Summary
**Goal:** Improve text readability across the app by making global typography colors appear brighter while preserving correct light/dark theme behavior.

**Planned changes:**
- Adjust global theme color tokens used for typography in `frontend/src/index.css` (at minimum: `--foreground`, `--card-foreground`, `--popover-foreground`, `--muted-foreground`) to increase perceived brightness.
- Validate the updated tokens maintain sufficient contrast and readability on common screens (login, calendar, daily view, settings) across both light and dark themes.

**User-visible outcome:** Text and secondary/help text across the app appears visibly brighter and is easier to read on background overlays and glass cards in both light and dark themes.
