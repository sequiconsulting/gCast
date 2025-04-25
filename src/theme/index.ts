import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, breakpoints, shadows } from './constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.gray[100],
      dark: colors.gray[900],
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.danger,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
    background: {
      default: colors.light,
      paper: colors.white,
    },
    text: {
      primary: colors.dark,
      secondary: colors.gray[600],
    },
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
    h1: {
      fontSize: typography.fontSize.xxxl,
      fontWeight: typography.fontWeight.bold,
    },
    h2: {
      fontSize: typography.fontSize.xxl,
      fontWeight: typography.fontWeight.semibold,
    },
    h3: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.medium,
    },
    h4: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
    },
    h5: {
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.medium,
    },
    h6: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
    body1: {
      fontSize: typography.fontSize.md,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: typography.fontWeight.medium,
    },
  },
  spacing: (factor: number) => `${factor * 4}px`,
  breakpoints: {
    values: {
      xs: parseInt(breakpoints.xs),
      sm: parseInt(breakpoints.sm),
      md: parseInt(breakpoints.md),
      lg: parseInt(breakpoints.lg),
      xl: parseInt(breakpoints.xl),
      xxl: parseInt(breakpoints.xxl),
    },
  },
  shadows: [
    'none',
    shadows.sm,
    shadows.md,
    shadows.lg,
    shadows.xl,
    ...Array(20).fill(shadows.xl),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: `${spacing.sm} ${spacing.lg}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: shadows.sm,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
}); 