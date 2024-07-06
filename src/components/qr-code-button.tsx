import { mergeProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { useTelegramPromptQrCodeScan } from "../api/qr-code";

export type TelegramQrCodeButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element;
    message?: string;
    onDataReceived: (data: string) => void;
  };

export function TelegramQrCodeButton(props: TelegramQrCodeButtonProps) {
  const promptQrCodeScan = useTelegramPromptQrCodeScan();
  const merged = mergeProps(props, {
    onClick: (e: any) => {
      promptQrCodeScan(props.message).then((result) => {
        props.onDataReceived(result);
      });
      if (props.onClick && typeof props.onClick == "function") {
        props.onClick(e);
      }
    },
  });

  return <button {...merged}>{props.children}</button>;
}
