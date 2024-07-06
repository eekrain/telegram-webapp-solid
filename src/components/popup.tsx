import { createSignal, onCleanup, onMount } from "solid-js";

type TelegramClickablePopupButton = {
  id?: PopupButton["id"];
  text?: PopupButton["text"];
  type?: PopupButton["type"];
  onClick?: () => void;
};

export type TelegramPopupProps = {
  title?: PopupParams["title"];
  message: PopupParams["message"];
  onButtonClick?: (id: string) => void;
  buttons: OneToThree<TelegramClickablePopupButton>;
};
type OneToThree<T> = [T] | [T, T] | [T, T, T];

const [alreadyOpened, setAlreadyOpened] = createSignal(false);

export function TelegramPopup(props: TelegramPopupProps) {
  onMount(() => {
    if (alreadyOpened()) {
      throw new Error("Popup can only be opened once");
    } else {
      window.Telegram.WebApp.showPopup(
        {
          message: props.message,
          buttons: props.buttons as unknown as PopupButton[],
          title: props.title,
        },
        (id) => {
          props.onButtonClick?.(id);
          props.buttons.find((btn) => btn.id == id)?.onClick?.();
        },
      );
      setAlreadyOpened(true);
    }
  });

  onCleanup(() => {
    setAlreadyOpened(false);
  });

  return null;
}
