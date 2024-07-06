import { createSignal, onCleanup, onMount } from "solid-js";
import { useTelegramAPI } from "../context";

export type TelegramConfirmProps = {
  message: string;
  onButtonClick?: (pressedTrue: boolean) => void;
};

const [alreadyOpened, setAlreadyOpened] = createSignal(false);

export function TelegramConfirm(props: TelegramConfirmProps) {
  const { TelegramInstance } = useTelegramAPI();

  onMount(() => {
    if (alreadyOpened()) {
      throw new Error("Confirm can only be opened once");
    } else {
      TelegramInstance()?.WebApp.showConfirm(props.message, (pressedTrue) => {
        if (props.onButtonClick) props.onButtonClick(pressedTrue);
      });
      setAlreadyOpened(true);
    }
  });

  onCleanup(() => {
    setAlreadyOpened(false);
  });

  return null;
}
