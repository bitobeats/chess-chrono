import { onMount, onCleanup } from "solid-js";
import { Maskito, type MaskitoOptions } from "@maskito/core";

export function useMaskito(inputElementRef: () => HTMLInputElement | undefined, options: MaskitoOptions) {
  onMount(() => {
    let maskedInput: Maskito | null = null;

    const element = inputElementRef();

    if (element) {
      maskedInput = new Maskito(element, { ...options });
    }

    onCleanup(() => {
      maskedInput?.destroy();
    });
  });
}
