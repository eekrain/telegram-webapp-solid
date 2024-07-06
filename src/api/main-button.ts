import { createEffect, onCleanup } from "solid-js";
import { useTelegramAPI } from "../context";
import { createTelegramHapticImpact } from "./haptic";

export type UseTelegramMainButtonProps = {
  onClick?: () => void;
  text?: string | null;
  show?: boolean;
  active?: boolean;
  progressVisible?: boolean;
  mandatory?: boolean;
  hapticForce?: Parameters<typeof createTelegramHapticImpact>[0];
};

export function useTelegramMainButton(props: UseTelegramMainButtonProps) {
  const hapticSignal = createTelegramHapticImpact(props.hapticForce);

  const { mainButton, TelegramInstance } = useTelegramAPI();

  mainButton.setVisible((visible) => props.show ?? visible);
  mainButton.setActive((active) => props.active ?? active);
  mainButton.setMandatory((mandatory) => props.mandatory ?? mandatory);
  mainButton.setProgressVisible((visible) => props.progressVisible ?? visible);
  mainButton.setText((text) => props.text ?? text);

  function handleClick() {
    if (props.hapticForce && hapticSignal) {
      hapticSignal();
    }

    if (mainButton.mandatory()) {
      mainButton.setMandatory(false);
    }

    if (props.onClick) props.onClick();
  }

  createEffect(function updateOnClick() {
    if (props.onClick) {
      TelegramInstance()?.WebApp.MainButton.onClick(handleClick);
    } else {
      TelegramInstance()?.WebApp.MainButton.offClick(handleClick);
    }
  });

  onCleanup(() => {
    TelegramInstance()?.WebApp.MainButton.offClick(handleClick);
  });

  return mainButton;
}
