import { createEffect } from "solid-js";
import { useTelegramAPI } from "../context";
import { Theme } from "../context/create-theme-context";

export function useTelegramTheme(props?: {
  onThemeChange?: (theme: Theme) => void;
}) {
  const { theme } = useTelegramAPI();

  createEffect(() => {
    if (props?.onThemeChange) {
      props.onThemeChange(theme.theme());
    }
  });

  return theme;
}
