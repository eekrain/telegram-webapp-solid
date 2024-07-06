import { useTelegramAPI } from "../context";

export function useTelegramUser() {
  const { TelegramInstance } = useTelegramAPI();

  const getUser = () => TelegramInstance()?.WebApp.initDataUnsafe.user;

  return getUser;
}
