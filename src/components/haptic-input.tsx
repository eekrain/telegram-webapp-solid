import { mergeProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createTelegramHapticSelection } from "../api/haptic";

export type TelegramHapticInputProps =
  JSX.InputHTMLAttributes<HTMLInputElement> & {
    children?: JSX.Element;
  };

export function TelegramHapticInput(props: TelegramHapticInputProps) {
  const hapticSelection = createTelegramHapticSelection();
  const merged = mergeProps(props, {
    onselectionchange: (e: any) => {
      hapticSelection();
    },
  });

  return <input {...merged}>{props.children}</input>;
}
