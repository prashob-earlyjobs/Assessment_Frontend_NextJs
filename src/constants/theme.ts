/**
 * Global Theme Constants
 * Centralized design tokens for consistent styling across the application
 */

// Primary Colors
export const PRIMARY_COLOR = '#F08504'; // Main orange/brand color
export const PRIMARY_COLOR_HOVER = '#F08504'; // Hover state (can be adjusted)
export const PRIMARY_COLOR_DARK = '#C2410C'; // Darker shade for hover states
export const PRIMARY_COLOR_LIGHT = '#FFF7ED'; // Light background tint

// Secondary Colors
export const SECONDARY_COLOR = '#1e3a8a'; // Navy blue
export const SECONDARY_COLOR_LIGHT = '#3b82f6'; // Light blue variant

// Accent Colors
export const ACCENT_COLOR = '#14b8a6'; // Teal (used in about-us page)
export const ACCENT_COLOR_LIGHT = '#5eead4'; // Light teal
export const ACCENT_COLOR_DARK = '#0d9488'; // Dark teal

// Text Colors
export const TEXT_PRIMARY = '#1f2937'; // Dark gray/black for main text
export const TEXT_SECONDARY = '#6b7280'; // Medium gray for secondary text
export const TEXT_LIGHT = '#9ca3af'; // Light gray for muted text
export const TEXT_WHITE = '#ffffff'; // White text

// Background Colors
export const BG_WHITE = '#ffffff';
export const BG_GRAY = '#f9fafb'; // Light gray background
export const BG_DARK = '#000000'; // Black background
export const BG_DARK_TRANSPARENT = 'rgba(0, 0, 0, 0.2)'; // Transparent dark overlay

// Border Colors
export const BORDER_COLOR = '#e5e7eb'; // Light gray border
export const BORDER_COLOR_DARK = '#d1d5db'; // Medium gray border
export const BORDER_ACCENT = '#14b8a6'; // Teal border (for accent elements)

// Status Colors
export const SUCCESS_COLOR = '#10b981'; // Green
export const ERROR_COLOR = '#ef4444'; // Red
export const WARNING_COLOR = '#f59e0b'; // Amber
export const INFO_COLOR = '#3b82f6'; // Blue

// Legacy Colors (from globals.css)
export const EARLYJOBS_ORANGE = '#ff6b35';
export const EARLYJOBS_NAVY = '#1e3a8a';
export const EARLYJOBS_TEXT = '#1f2937';
export const EARLYJOBS_LIGHT_ORANGE = '#fff7ed';

// Spacing Scale (in pixels, can be converted to rem/px as needed)
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
};

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded
};

// Font Sizes
export const FONT_SIZE = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  base: '1rem',    // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',   // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', // 72px
};

// Font Weights
export const FONT_WEIGHT = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Shadows
export const SHADOW = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-Index Scale
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Transition Durations
export const TRANSITION = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
};

// Export all colors as a single object for easier access
export const COLORS = {
  primary: PRIMARY_COLOR,
  primaryHover: PRIMARY_COLOR_HOVER,
  primaryDark: PRIMARY_COLOR_DARK,
  primaryLight: PRIMARY_COLOR_LIGHT,
  secondary: SECONDARY_COLOR,
  secondaryLight: SECONDARY_COLOR_LIGHT,
  accent: ACCENT_COLOR,
  accentLight: ACCENT_COLOR_LIGHT,
  accentDark: ACCENT_COLOR_DARK,
  textPrimary: TEXT_PRIMARY,
  textSecondary: TEXT_SECONDARY,
  textLight: TEXT_LIGHT,
  textWhite: TEXT_WHITE,
  bgWhite: BG_WHITE,
  bgGray: BG_GRAY,
  bgDark: BG_DARK,
  bgDarkTransparent: BG_DARK_TRANSPARENT,
  borderColor: BORDER_COLOR,
  borderColorDark: BORDER_COLOR_DARK,
  borderAccent: BORDER_ACCENT,
  success: SUCCESS_COLOR,
  error: ERROR_COLOR,
  warning: WARNING_COLOR,
  info: INFO_COLOR,
  earlyjobsOrange: EARLYJOBS_ORANGE,
  earlyjobsNavy: EARLYJOBS_NAVY,
  earlyjobsText: EARLYJOBS_TEXT,
  earlyjobsLightOrange: EARLYJOBS_LIGHT_ORANGE,
};

// Default export with all constants
export default {
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  shadow: SHADOW,
  breakpoints: BREAKPOINTS,
  zIndex: Z_INDEX,
  transition: TRANSITION,
};
