import { onMount, onCleanup } from "solid-js";
import { Maskito } from "@maskito/core";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";

export function useIncrementByInputMask(inputElementRef: () => HTMLInputElement | undefined) {
  onMount(() => {
    let maskedInput: Maskito | null = null;

    const options = maskitoNumberOptionsGenerator({});

    const element = inputElementRef();

    if (element) {
      maskedInput = new Maskito(element, { ...options });
    }

    onCleanup(() => {
      maskedInput?.destroy();
    });
  });
}
