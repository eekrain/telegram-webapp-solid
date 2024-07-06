import { createSignal, mergeProps, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { TelegramAlert } from "./alert";

export type TelegramAlertButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element;
    message: string;
    onAlertClose?: () => void;
  };

export function TelegramAlertButton(props: TelegramAlertButtonProps) {
  let [showAlert, setShowAlert] = createSignal(false);

  const merged = mergeProps(props, {
    onClick: (e: any) => {
      setShowAlert(true);

      if (props.onClick && typeof props.onClick == "function") {
        props.onClick(e);
      }
    },
  });

  return (
    <>
      <button {...merged}>{props.children}</button>
      <Show when={showAlert()}>
        <TelegramAlert
          message={props.message}
          onButtonClick={() => {
            props.onAlertClose?.();
            setShowAlert(false);
          }}
        />
      </Show>
    </>
  );
}
