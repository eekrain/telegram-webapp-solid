import { mergeProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { HapticForce, useTelegramHapticImpact } from "../api/haptic";

export type TelegramHapticButtonProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element;
    hapticForce?: HapticForce;
  };

export function TelegramHapticButton(props: TelegramHapticButtonProps) {
  const hapticImpact = useTelegramHapticImpact();

  const merged = mergeProps(props, {
    onClick: (e: any) => {
      hapticImpact(props.hapticForce ?? "medium");
      if (props.onClick && typeof props.onClick == "function") {
        props.onClick(e);
      }
    },
  });

  return <button {...merged}>{props.children}</button>;
}
