import { theme } from '@chakra-ui/core';

const breakpoints: any = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const customTheme = {
  ...theme,
  ...breakpoints,
  fonts: {
    body: "Merriweather, system-ui, sans-serif",
    heading: "Playfair Display, Georgia, serif",
    mono: "Menlo, monospace",
  },
}
export default customTheme;