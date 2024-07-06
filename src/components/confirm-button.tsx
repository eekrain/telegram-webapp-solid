import { createSignal, mergeProps, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { TelegramConfirm } from "./confirm";

export type TelegramConfirmButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element;
    message: string;
    onClose?: (pressedTrue: boolean) => void;
  };

export function TelegramConfirmButton(props: TelegramConfirmButtonProps) {
  let [showConfirm, setShowConfirm] = createSignal(false);

  const merged = mergeProps(props, {
    onClick: (e: any) => {
      setShowConfirm(true);

      if (props.onClick && typeof props.onClick == "function") {
        props.onClick(e);
      }
    },
  });

  return (
    <>
      <button {...merged}>{props.children}</button>
      <Show when={showConfirm()}>
        <TelegramConfirm
          message={props.message}
          onButtonClick={(pressedTrue) => {
            props.onClose?.(pressedTrue);
            setShowConfirm(false);
          }}
        />
      </Show>
    </>
  );
}
