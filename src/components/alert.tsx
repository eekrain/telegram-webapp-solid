import { createSignal, onCleanup, onMount } from "solid-js";
import { useTelegramAPI } from "../context";

export type TelegramAlertProps = {
  message: string;
  onButtonClick?: () => void;
};

const [alreadyOpened, setAlreadyOpened] = createSignal(false);

export function TelegramAlert(props: TelegramAlertProps) {
  const { TelegramInstance } = useTelegramAPI();
  onMount(() => {
    if (alreadyOpened()) {
      throw new Error("Alert can only be opened once");
    } else {
      TelegramInstance()?.WebApp.showAlert(props.message, () => {
        if (props.onButtonClick) props.onButtonClick();
      });
      setAlreadyOpened(true);
    }
  });

  onCleanup(() => {
    setAlreadyOpened(false);
  });

  return null;
}
