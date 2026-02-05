/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "page-pad": "var(--page-pad)",
        "bar-pad-x": "16px",
        "bar-pad-y": "10px",
        "bar-pad-compact-x": "10px",
        "bar-pad-compact-y": "8px",
        "bar-gap": "var(--bar-gap)",
        "bar-gap-compact": "var(--bar-gap-compact)",
        "frame-gap": "var(--frame-gap)",
        "frame-max": "var(--frame-max)",
        "slider-track-h": "var(--slider-track-h)",
        "slider-thumb": "var(--slider-thumb)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      borderWidth: {
        thick: "var(--border-thick)",
        btn: "var(--border-btn)",
      },
      colors: {
        surface: "var(--color-bg)",
        ink: "var(--color-text)",
        white: "var(--color-white)",
        bar: "var(--color-bar)",
        "bar-line": "var(--color-bar-border)",
        "white-65": "var(--white-65)",
        "white-18": "var(--white-18)",
        "white-12": "var(--white-12)",
        paper: "#fff9e8",
        "paper-2": "#fff4d1",
        accent: "#ffc400",
        "accent-dark": "#6b4a00",
        "ink-2": "#2e2e2e",
        "shadow-45": "rgba(0, 0, 0, 0.45)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        bar: "var(--shadow-bar)",
        thumb: "var(--shadow-thumb)",
        "thumb-lg": "var(--shadow-thumb-lg)",
        handle: "var(--shadow-handle)",
        "handle-hover": "var(--shadow-handle-hover)",
      },
      zIndex: {
        img: "1",
        badge: "2",
        title: "10",
        bar: "20",
        overlay: "25",
        handle: "30",
      },
      animation: {
        stretch: "stretch 230ms ease",
      },
      fontFamily: {
        title: ["Arial", "sans-serif"],
        badge: [
          '"Arial Rounded MT Bold"',
          '"Arial Rounded MT"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
