import { createEffect, onCleanup } from "solid-js";
import { createTelegramHapticImpact } from "./haptic";
import { useTelegramAPI } from "../context";

export type UseTelegramBackButtonProps = {
  onClick?: () => void;
  show?: boolean;
  hapticForce?: Parameters<typeof createTelegramHapticImpact>[0];
};

export function useTelegramBackButton(props: UseTelegramBackButtonProps) {
  const { backButton, TelegramInstance } = useTelegramAPI();
  const hapticSignal = createTelegramHapticImpact(props.hapticForce);

  backButton.setVisible((visible) => props.show ?? visible);

  function handleClick() {
    if (props.hapticForce && hapticSignal) {
      hapticSignal();
    }
    if (props.onClick) props.onClick();
  }

  createEffect(function updateOnClick() {
    if (props.onClick) {
      TelegramInstance()?.WebApp.BackButton.onClick(handleClick);
    } else {
      TelegramInstance()?.WebApp.BackButton.offClick(handleClick);
    }
  });

  onCleanup(() => {
    TelegramInstance()?.WebApp.BackButton.offClick(handleClick);
  });

  return backButton;
}
