import { onMount, onCleanup } from "solid-js";
import { Maskito } from "@maskito/core";
import { maskitoTimeOptionsGenerator } from "@maskito/kit";

export function useStartTimeInputMask(inputElementRef: () => HTMLInputElement | undefined) {
  onMount(() => {
    let maskedInput: Maskito | null = null;

    const options = maskitoTimeOptionsGenerator({ mode: "HH:MM:SS", timeSegmentMaxValues: { hours: 99 } });

    const element = inputElementRef();

    if (element) {
      maskedInput = new Maskito(element, { ...options });
    }

    onCleanup(() => {
      maskedInput?.destroy();
    });
  });
}
