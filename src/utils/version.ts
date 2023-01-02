import { WebApp } from '../types/telegram-webapp'

const versions = ['6.1', '6.2', '6.3', '6.4'] as const
type Version = typeof versions[number]

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
  BackButton: null,
  MainButton: null,
  HapticFeedback: null,
  isVersionAtLeast: null,
  setHeaderColor: '6.1',
  setBackgroundColor: '6.1',
  enableClosingConfirmation: '6.2',
  disableClosingConfirmation: '6.2',
  onEvent: null,
  offEvent: null,
  sendData: null,
  openLink: null,
  openTelegramLink: null,
  openInvoice: '6.1',
  showPopup: '6.2',
  showAlert: '6.2',
  showConfirm: '6.2',
  showScanQrPopup: '6.4',
  readTextFromClipboard: '6.4',
  closeScanQrPopup: '6.4',
  ready: null,
  expand: null,
  close: null,
} as Record<keyof WebApp, Version | null>

export function checkIfAvailable(property: keyof WebApp) {
  if (
    versionOf[property] == null ||
    versionOf[property] == window.Telegram.WebApp.version
  ) {
    return true
  } else {
    return false
  }
}