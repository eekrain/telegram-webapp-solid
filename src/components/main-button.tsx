import { createEffect, onCleanup } from "solid-js";
import { createTelegramHapticImpact } from "../api/haptic";
import { useTelegramMainButton } from "../api/main-button";

export type TelegramMainButtonProps = {
  onClick?: () => void;
  text?: string;
  active?: boolean;
  progressVisible?: boolean;
  mandatory?: boolean;
  onMandatoryChange?: (mandatory: boolean) => void;
  hapticForce?: Parameters<typeof createTelegramHapticImpact>[0];
};

export function TelegramMainButton(props: TelegramMainButtonProps) {
  const mainButton = useTelegramMainButton({
    onClick: props.onClick,
    text: props.text,
    hapticForce: props.hapticForce,
    active: props.active,
    progressVisible: props.progressVisible,
    mandatory: props.mandatory,
    show: true,
  });

  createEffect(() => {
    props.onMandatoryChange?.(mainButton.mandatory());
  });

  onCleanup(() => {
    console.log("main button cleanup, we hide");
    mainButton.setVisible(false);
    mainButton.setActive(true);
    mainButton.setProgressVisible(false);
    mainButton.setText(null);
    mainButton.setMandatory(false);
  });

  createEffect(() => {
    mainButton.setActive(props.active);
    mainButton.setProgressVisible(props.progressVisible);
    mainButton.setText(props.text || "");
    mainButton.setMandatory(props.mandatory || false);
  });

  return null;
}
