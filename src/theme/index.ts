// src/theme/index.ts

export const Theme = {
  colors: {
    white: "#FFFFFF",
    offWhite: "#F9F9F9",
    textPrimary: "#222222",
    textSecondary: "#555555",
    grayLight: "#CCCCCC",
    roseGold: "#986C6A",
    gold: "#B8860B",
    background: "#FFFFFF",
    backgroundSoft: "#F9F9F9",
  },

  typography: {
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: "#222222",
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "#222222",
    },
    text: {
      fontSize: 16,
      color: "#222222",
    },
    textLight: {
      fontSize: 14,
      color: "#555555",
    },
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  },

  shadow: {
    soft: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
  },
};

export default Theme;
