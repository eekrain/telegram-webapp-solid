import { Accessor, createSignal, onCleanup } from "solid-js";

export type ViewportContext = ReturnType<typeof createViewportContext>;

export const createViewportContext = (
  TelegramInstance: Accessor<Telegram | null>,
) => {
  const [expanded, setExpanded] = createSignal(
    TelegramInstance()?.WebApp.isExpanded,
  );
  const [viewportHeight, setViewportHeight] = createSignal(
    TelegramInstance()?.WebApp.viewportHeight,
  );
  const [viewportStableHeight, setViewportStableHeight] = createSignal(
    TelegramInstance()?.WebApp.viewportStableHeight,
  );

  function updateViewport(isStateStable: boolean) {
    if (isStateStable) {
      setExpanded(TelegramInstance()?.WebApp.isExpanded);
      setViewportStableHeight(TelegramInstance()?.WebApp.viewportStableHeight);
    }

    setViewportHeight(TelegramInstance()?.WebApp.viewportHeight);
  }

  TelegramInstance()?.WebApp.onEvent("viewportChanged", (e) =>
    updateViewport(e.isStateStable),
  );

  onCleanup(() => {
    TelegramInstance()?.WebApp.offEvent("viewportChanged", (e) =>
      updateViewport(e.isStateStable),
    );
  });

  return {
    expanded,
    expand: () => TelegramInstance()?.WebApp.expand(),
    viewportHeight,
    viewportStableHeight,
  };
};
