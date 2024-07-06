import { useTelegramAPI } from "../context";

export function useTelegramLifecycle() {
  const { TelegramInstance } = useTelegramAPI();
  const ready = () => TelegramInstance()?.WebApp.ready();
  const close = () => TelegramInstance()?.WebApp.close();

  return {
    ready,
    close,
  };
}
