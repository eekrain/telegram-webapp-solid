import { useTelegramAPI } from "../context";

export function useTelegramOpenFunctions() {
  const { TelegramInstance } = useTelegramAPI();

  const onInvoiceClosed = (
    cb: (obj: {
      url: string;
      status: "paid" | "cancelled" | "failed" | "pending";
    }) => void,
  ) => {
    TelegramInstance()?.WebApp.onEvent("invoiceClosed", cb);
  };

  const openLink: WebApp["openLink"] = (url, opts) =>
    TelegramInstance()?.WebApp.openLink(url, opts);
  const openTelegramLink: WebApp["openTelegramLink"] = (url) =>
    TelegramInstance()?.WebApp.openTelegramLink(url);
  const openInvoice: WebApp["openInvoice"] = (url, cb) =>
    TelegramInstance()?.WebApp.openInvoice(url, cb);

  return {
    openLink,
    openTelegramLink,
    openInvoice,
    onInvoiceClosed,
  };
}
