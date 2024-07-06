import { Accessor, createSignal, onCleanup } from "solid-js";

export type ThemeContext = ReturnType<typeof createThemeContext>;
export type Theme = {
  themeParams: ThemeParams;
  colorScheme: WebApp["colorScheme"];
  headerColor: string;
  backgroundColor: string;
};

export const createThemeContext = (
  TelegramInstance: Accessor<Telegram | null>,
) => {
  const [theme, setTheme] = createSignal<Theme>({
    themeParams: TelegramInstance()?.WebApp.themeParams!,
    colorScheme: TelegramInstance()?.WebApp.colorScheme!,
    headerColor: TelegramInstance()?.WebApp.headerColor!,
    backgroundColor: TelegramInstance()?.WebApp.backgroundColor!,
  });

  function updateTheme() {
    setTheme({
      themeParams: TelegramInstance()?.WebApp.themeParams!,
      colorScheme: TelegramInstance()?.WebApp.colorScheme!,
      headerColor: TelegramInstance()?.WebApp.headerColor!,
      backgroundColor: TelegramInstance()?.WebApp.backgroundColor!,
    });
  }

  TelegramInstance()?.WebApp.onEvent("themeChanged", updateTheme);

  onCleanup(() => {
    TelegramInstance()?.WebApp.offEvent("themeChanged", updateTheme);
  });

  return {
    theme,
    setHeaderColor: TelegramInstance()?.WebApp.setHeaderColor,
    setBackgroundColor: TelegramInstance()?.WebApp.setBackgroundColor,
  };
};
