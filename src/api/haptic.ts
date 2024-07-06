import { useTelegramAPI } from "../context";

export type HapticForce = Parameters<
  WebApp["HapticFeedback"]["impactOccurred"]
>[0];

export const useTelegramHapticImpact = () => {
  const { TelegramInstance } = useTelegramAPI();
  return (force?: HapticForce) => {
    if (force) TelegramInstance()?.WebApp.HapticFeedback.impactOccurred(force);
  };
};

export const useTelegramHapticSelection = () => {
  const { TelegramInstance } = useTelegramAPI();
  return () => TelegramInstance()?.WebApp.HapticFeedback.selectionChanged();
};

export function createTelegramHapticImpact(force?: HapticForce) {
  const hapticImpact = useTelegramHapticImpact();
  return () => hapticImpact(force);
}

export function createTelegramHapticSelection() {
  const hapticSelection = useTelegramHapticSelection();
  return () => hapticSelection();
}
