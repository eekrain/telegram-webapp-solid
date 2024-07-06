import { createScriptLoader } from "@solid-primitives/script-loader";
import {
  Accessor,
  ParentComponent,
  createContext,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import {
  MainButtonContext,
  createMainButtonContext,
} from "./create-main-button-context";
import {
  BackButtonContext,
  createBackButtonContext,
} from "./create-back-button-context";
import {
  ViewportContext,
  createViewportContext,
} from "./create-viewport-context";
import { ThemeContext, createThemeContext } from "./create-theme-context";

type TelegramAPIContextType = {
  TelegramInstance: Accessor<Telegram | null>;
  telegramUser: Accessor<WebAppInitData | null>;
  mainButton: MainButtonContext;
  backButton: BackButtonContext;
  viewport: ViewportContext;
  theme: ThemeContext;
};
const TelegramAPIContext = createContext<TelegramAPIContextType>();

export const TelegramAPIProvider: ParentComponent<{}> = (props) => {
  const [telegramUser, setTelegramUser] = createSignal<WebAppInitData | null>(
    null,
  );
  const [TelegramInstance, setTelegramInstance] = createSignal<Telegram | null>(
    null,
  );

  onMount(() => {
    createScriptLoader({
      src: "https://telegram.org/js/telegram-web-app.js",
      async onLoad() {
        window.Telegram.WebApp.ready();

        setTelegramInstance(window.Telegram);
        setTelegramUser(window.Telegram.WebApp.initDataUnsafe);
      },
    });
  });

  return (
    <TelegramAPIContext.Provider
      value={{
        TelegramInstance,
        telegramUser,
        mainButton: createMainButtonContext(TelegramInstance),
        backButton: createBackButtonContext(TelegramInstance),
        viewport: createViewportContext(TelegramInstance),
        theme: createThemeContext(TelegramInstance),
      }}
    >
      {props.children}
    </TelegramAPIContext.Provider>
  );
};

export function useTelegramAPI() {
  const context = useContext(TelegramAPIContext);
  console.log("context", context);
  if (context == null) {
    throw new Error("useTelegramAPI must be used within a TelegramAPIProvider");
  }
  return context;
}
