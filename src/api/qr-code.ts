import { useTelegramAPI } from "../context";

export const useTelegramPromptQrCodeScan = () => {
  const { TelegramInstance } = useTelegramAPI();

  const promptQrCodeScan = (message?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      TelegramInstance()?.WebApp.showScanQrPopup(
        { text: message },
        (result) => {
          if (result) {
            resolve(result);
            return true;
          } else {
            reject(new Error("QR code scan failed"));
            return true;
          }
        },
      );
    });
  };
  return promptQrCodeScan;
};

export function createTelegramPromptQrCodeScan(message?: string) {
  const promptQrCodeScan = useTelegramPromptQrCodeScan();
  return () => promptQrCodeScan(message);
}
