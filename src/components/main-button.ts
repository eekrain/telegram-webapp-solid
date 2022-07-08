import { createEffect, onCleanup, onMount } from "solid-js";

export type MainButtonProps = {
  onClick?: () => void;
  text?: string;
};

export function MainButton(props: MainButtonProps) {
  const originalText = window.Telegram.WebApp.MainButton.text;

  onMount(() => {
    window.Telegram.WebApp.MainButton.show();
  });

  onCleanup(() => {
    window.Telegram.WebApp.MainButton.hide();
  });

  createEffect(function updateText() {
    if (props.text) {
      window.Telegram.WebApp.MainButton.setText(props.text);
    } else {
      window.Telegram.WebApp.MainButton.setText(originalText);
    }
  });

  createEffect(function updateOnClick() {
    if (props.onClick) {
      window.Telegram.WebApp.MainButton.onClick(props.onClick);
    } else {
      window.Telegram.WebApp.MainButton.onClick(undefined);
    }
  });

  return null;
}
