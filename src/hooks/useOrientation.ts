import { createSignal, onMount, onCleanup } from "solid-js";

export function useOrientation() {
  const [orientation, setOrientation] = createSignal<"portrait" | "landscape">("portrait");

  onMount(() => {
    const matchMediaOrientation = window.matchMedia("(orientation: portrait)");

    function updateOrientation() {
      setOrientation(matchMediaOrientation.matches ? "portrait" : "landscape");
    }

    updateOrientation();

    matchMediaOrientation.addEventListener("change", updateOrientation);

    onCleanup(() => {
      matchMediaOrientation.removeEventListener("change", updateOrientation);
    });
  });

  return orientation;
}
