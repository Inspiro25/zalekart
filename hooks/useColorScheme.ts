import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// This hook provides color values based on the current theme
export function useColorScheme() {
  const { isDarkMode } = useTheme();

  const colors = {
    // Background colors
    background: isDarkMode ? "#111827" : "#f3f4f6",
    card: isDarkMode ? "#1f2937" : "#ffffff",
    primary: isDarkMode ? "#3b82f6" : "#2563eb",
    secondary: isDarkMode ? "#4b5563" : "#6b7280",
    accent: isDarkMode ? "#60a5fa" : "#3b82f6",

    // Text colors
    text: isDarkMode ? "#f3f4f6" : "#111827",
    textSecondary: isDarkMode ? "#9ca3af" : "#4b5563",
    textMuted: isDarkMode ? "#6b7280" : "#9ca3af",

    // Border colors
    border: isDarkMode ? "#374151" : "#e5e7eb",
    divider: isDarkMode ? "#374151" : "#e5e7eb",

    // Status colors
    success: isDarkMode ? "#10b981" : "#059669",
    error: isDarkMode ? "#ef4444" : "#dc2626",
    warning: isDarkMode ? "#f59e0b" : "#d97706",
    info: isDarkMode ? "#3b82f6" : "#2563eb",
  };

  return colors;
}
