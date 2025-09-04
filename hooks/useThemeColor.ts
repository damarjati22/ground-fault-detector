import { useTheme } from "@/constants/theme";

type Colors = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: Colors,
  colorName: "text" | "background" = "text"
) {
  const { theme } = useTheme();

  // Warna default
  const colorPalette = {
    light: {
      text: "#000000",
      background: "#ffffff",
    },
    dark: {
      text: "#ffffff",
      background: "#000000",
    },
  };

  return props[theme] ?? colorPalette[theme][colorName];
}
