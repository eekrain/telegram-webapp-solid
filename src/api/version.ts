import { useTelegramAPI } from "../context";

export const telegramApiVersions = ["6.1", "6.2", "6.3", "6.4"] as const;
export type APIVersion = (typeof telegramApiVersions)[number];

const versionOf = {
  initData: null,
  initDataUnsafe: null,
  version: null,
  platform: null,
  colorScheme: null,
  themeParams: null,
  isExpanded: null,
  viewportHeight: null,
  viewportStableHeight: null,
  headerColor: null,
  backgroundColor: null,
  BackButton: "6.1",
  MainButton: null,
  HapticFeedback: "6.1",
  isVersionAtLeast: null,
  setHeaderColor: "6.1",
  setBackgroundColor: "6.1",
  enableClosingConfirmation: "6.2",
  disableClosingConfirmation: "6.2",
  onEvent: null,
  offEvent: null,
  sendData: null,
  openLink: null,
  openTelegramLink: null,
  openInvoice: "6.1",
  showPopup: "6.2",
  showAlert: "6.2",
  showConfirm: "6.2",
  showScanQrPopup: "6.4",
  readTextFromClipboard: "6.4",
  closeScanQrPopup: "6.4",
  ready: null,
  expand: null,
  close: null,
} as Record<keyof WebApp, APIVersion | null>;

export function useTelegramVersion() {
  const { TelegramInstance } = useTelegramAPI();
  const getVersion = () => TelegramInstance()?.WebApp.version;

  const isVersionAtLeast = (version?: string | null) => {
    const instance = TelegramInstance();
    if (!instance) return false;
    if (!version) return false;
    return instance.WebApp.isVersionAtLeast(version);
  };

  function checkIfAvailable(property: keyof WebApp) {
    if (versionOf[property] == null || isVersionAtLeast(versionOf[property])) {
      return true;
    } else {
      return false;
    }
  }
  return {
    version: getVersion(),
    isVersionAtLeast,
    checkIfAvailable,
  };
}
