import { useTelegramAPI } from "../context";

export const useTelegramDataAPI = () => {
  const { TelegramInstance } = useTelegramAPI();
  const getData = () => TelegramInstance()?.WebApp.initDataUnsafe;
  const sendData = (data: string) => TelegramInstance()?.WebApp.sendData(data);

  return [getData, sendData];
};
