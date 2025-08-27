export const theme = {
    colors: {
      bg: "#f7f9fb",
      card: "#ffffff",
      text: "#1a1a1a",
      muted: "#6b7280",
      primary: "#22c55e",
      danger: "#ef4444",
      border: "#e5e7eb",
      focus: "#3b82f6",
      header: "#e9f5ff",
      white: '#fff',
    },
    spacing: (n: number) => `${n * 4}px`,
    radius: {
      md: "12px",
      sm: "10px",
    },
    shadow: "0 6px 20px rgba(0,0,0,0.06)",
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    media: {
      sm: "@media (max-width: 640px)",
      md: "@media (max-width: 768px)",
      lg: "@media (max-width: 1024px)",
      xl: "@media (max-width: 1280px)",
    },
  } as const;
  export type AppTheme = typeof theme;
  