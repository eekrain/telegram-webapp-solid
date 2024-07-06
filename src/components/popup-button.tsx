import { createSignal, mergeProps, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { TelegramPopup, TelegramPopupProps } from "./popup";

export type TelegramPopupButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> &
    TelegramPopupProps & {
      children: JSX.Element;
      onPopupClose?: (buttonId: string) => void;
    };

export function TelegramPopupButton(props: TelegramPopupButtonProps) {
  let [showPopup, setShowPopup] = createSignal(false);

  const merged = mergeProps(props, {
    onClick: (e: any) => {
      setShowPopup(true);

      if (props.onClick && typeof props.onClick == "function") {
        props.onClick(e);
      }
    },
  });

  return (
    <>
      <button {...merged}>{props.children}</button>
      <Show when={showPopup()}>
        <TelegramPopup
          message={props.message}
          buttons={props.buttons}
          title={props.title}
          onButtonClick={(id) => {
            props.onPopupClose?.(id);
            setShowPopup(false);
          }}
        />
      </Show>
    </>
  );
}
