import { Accessor, createSignal, createEffect } from "solid-js";

export type MainButtonContext = ReturnType<typeof createMainButtonContext>;

export const createMainButtonContext = (
  TelegramInstance: Accessor<Telegram | null>,
) => {
  const originalText = TelegramInstance()?.WebApp.MainButton.text || "";

  const [visible, setVisible] = createSignal(
    TelegramInstance()?.WebApp.MainButton.isVisible,
  );
  const [active, setActive] = createSignal(
    TelegramInstance()?.WebApp.MainButton.isActive,
  );
  const [progressVisible, setProgressVisible] = createSignal(
    TelegramInstance()?.WebApp.MainButton.isProgressVisible,
  );
  const [mandatory, setMandatory] = createSignal(false);
  const [text, setText] = createSignal<string | null>(originalText);

  const mainButton = {
    visible,
    setVisible,
    active,
    setActive,
    progressVisible,
    setProgressVisible,
    mandatory,
    setMandatory,
    text,
    setText,
  };

  createEffect(function updateVisibility() {
    if (mainButton.visible()) {
      console.log("showing main button");
      TelegramInstance()?.WebApp.MainButton.show();
    } else {
      console.log("hiding main button");
      TelegramInstance()?.WebApp.MainButton.hide();
    }
  });

  createEffect(function updateText() {
    const mainButtonText = mainButton.text();
    if (mainButtonText) {
      TelegramInstance()?.WebApp.MainButton.setText(mainButtonText);
    } else {
      TelegramInstance()?.WebApp.MainButton.setText(originalText);
    }
  });

  createEffect(function updateProgressVisibility() {
    if (mainButton.progressVisible()) {
      TelegramInstance()?.WebApp.MainButton.showProgress();
    } else {
      TelegramInstance()?.WebApp.MainButton.hideProgress();
    }
  });

  createEffect(function updateActive() {
    if (mainButton.active()) {
      TelegramInstance()?.WebApp.MainButton.enable();
    } else {
      TelegramInstance()?.WebApp.MainButton.disable();
    }
  });

  createEffect(function updateMandatory() {
    if (mainButton.mandatory()) {
      TelegramInstance()?.WebApp.enableClosingConfirmation();
    } else {
      TelegramInstance()?.WebApp.disableClosingConfirmation();
    }
  });

  return {
    visible: mainButton.visible,
    setVisible: mainButton.setVisible,
    active: mainButton.active,
    setActive: mainButton.setActive,
    progressVisible: mainButton.progressVisible,
    setProgressVisible: mainButton.setProgressVisible,
    text: mainButton.text,
    setText: mainButton.setText,
    mandatory: mainButton.mandatory,
    setMandatory: mainButton.setMandatory,
  };
};
