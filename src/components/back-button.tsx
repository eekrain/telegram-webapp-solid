import { onCleanup } from "solid-js";
import { useTelegramBackButton } from "../api/back-button";
import { createTelegramHapticImpact } from "../api/haptic";

export type TelegramBackButtonProps = {
  onClick?: () => void;
  hapticForce?: Parameters<typeof createTelegramHapticImpact>[0];
};

export function TelegramBackButton(props: TelegramBackButtonProps) {
  const backButton = useTelegramBackButton({
    onClick: props.onClick,
    hapticForce: props.hapticForce,
    show: true,
  });

  onCleanup(() => {
    backButton.setVisible(false);
  });

  return null;
}
