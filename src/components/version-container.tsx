import { ParentProps } from "solid-js";
import { APIVersion, useTelegramVersion } from "../api/version";

export function TelegramVersionContainer(
  props: ParentProps<
    { ifVersionAtLeast: APIVersion } | { ifAvailable: keyof WebApp }
  >,
) {
  const { isVersionAtLeast, checkIfAvailable } = useTelegramVersion();

  if ("ifVersionAtLeast" in props) {
    if (isVersionAtLeast(props.ifVersionAtLeast)) {
      return <>{props.children}</>;
    } else {
      return null;
    }
  } else if ("ifAvailable" in props) {
    if (checkIfAvailable(props.ifAvailable)) {
      return <>{props.children}</>;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
