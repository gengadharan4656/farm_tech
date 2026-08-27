// Shared Tailwind theme for the AgriPulse / Digital Krishi Officer app.
// Loaded on every page right after the Tailwind CDN <script> tag.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#d8dadc",
        "on-primary-container": "#86af99",
        "on-secondary-fixed-variant": "#0e5138",
        "glass-fill-light": "rgba(255, 255, 255, 0.7)",
        "surface-bright": "#f7f9fb",
        "outline-variant": "#c1c8c2",
        "on-primary": "#ffffff",
        "on-tertiary-fixed-variant": "#354c3b",
        "surface-container": "#eceef0",
        "on-background": "#191c1e",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#cee9d3",
        "inverse-surface": "#2d3133",
        "tertiary-fixed-dim": "#b3cdb7",
        "background": "#f7f9fb",
        "primary-fixed": "#c1ecd4",
        "primary-fixed-dim": "#a5d0b9",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#414844",
        "tertiary": "#152b1c",
        "on-tertiary-fixed": "#092012",
        "accent-gold": "#FBA500",
        "surface": "#f7f9fb",
        "moss-dark": "#081C15",
        "primary-container": "#1b4332",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#191c1e",
        "error": "#ba1a1a",
        "on-error-container": "#93000a",
        "surface-variant": "#e0e3e5",
        "surface-container-highest": "#e0e3e5",
        "on-primary-fixed-variant": "#274e3d",
        "inverse-primary": "#a5d0b9",
        "on-secondary-fixed": "#002114",
        "on-error": "#ffffff",
        "on-tertiary-container": "#93ad98",
        "surface-tint": "#3f6653",
        "on-primary-fixed": "#002114",
        "on-secondary": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "primary": "#012d1d",
        "tertiary-container": "#2a4131",
        "inverse-on-surface": "#eff1f3",
        "secondary": "#2c694e",
        "leaf-vibrant": "#40916C",
        "glass-fill-dark": "rgba(27, 67, 50, 0.6)",
        "on-secondary-container": "#316e52",
        "surface-container-high": "#e6e8ea",
        "secondary-fixed": "#b1f0ce",
        "outline": "#717973",
        "secondary-fixed-dim": "#95d4b3",
        "secondary-container": "#aeeecb"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        "container-max": "1280px",
        "margin-mobile": "16px",
        "card-padding": "32px",
        unit: "8px"
      },
      fontFamily: {
        "body-lg": ["Inter"],
        "label-md": ["Inter"],
        "headline-lg-mobile": ["Sora"],
        "label-sm": ["Inter"],
        "headline-md": ["Sora"],
        "headline-lg": ["Sora"],
        "display-lg": ["Sora"],
        "body-md": ["Inter"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
      }
    }
  }
};