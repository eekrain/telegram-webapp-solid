import { createSignal, createEffect, Accessor } from "solid-js";

export type BackButtonContext = ReturnType<typeof createBackButtonContext>;

export const createBackButtonContext = (
  TelegramInstance: Accessor<Telegram | null>,
) => {
  const [visible, setVisible] = createSignal(
    TelegramInstance()?.WebApp.BackButton.isVisible,
  );

  createEffect(function updateVisibility() {
    if (visible()) {
      TelegramInstance()?.WebApp.BackButton.show();
    } else {
      TelegramInstance()?.WebApp.BackButton.hide();
    }
  });

  return {
    visible,
    setVisible,
  };
};
