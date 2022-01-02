interface LanguageColors {
  [key: string]: {
    bg: string;
    fg: string;
  };
}

export const languageColors: LanguageColors = {
  TypeScript: { bg: "#2b7489", fg: "#ffffff" },
  JavaScript: { bg: "#f1e05a", fg: "#000" },
  HTML: { bg: "#F02F40", fg: "#ffffff" },
  CSS: { bg: "#563d7c", fg: "#ffffff" },
  Python: { bg: "#3572A5", fg: "#ffffff" },
  Shell: { bg: "#89e051", fg: "#000000" },
  Go: { bg: "#00ADD8", fg: "#ffffff" },
  Dockerfile: { bg: "#384d54", fg: "#ffffff" },
  Ruby: { bg: "#CC342D", fg: "#ffffff" },
  SCSS: { bg: "#C76494", fg: "#ffffff" },
};
