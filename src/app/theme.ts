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
      header: "#e9f5ff", // moved here per note
      white: '#fff',
    },
    spacing: (n: number) => `${n * 4}px`, // 1 = 4px scale
    radius: {
      md: "12px",
      sm: "10px",
    },
    shadow: "0 6px 20px rgba(0,0,0,0.06)",
  } as const;
  export type AppTheme = typeof theme;
  