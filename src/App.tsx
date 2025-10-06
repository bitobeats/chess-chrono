import { createSignal, onMount, Show } from "solid-js";

import { Toaster } from "solid-toast";
import { Controls } from "./components/Controls/Controls";
import { ClockSwitches } from "./components/ClockSwitches/ClockSwitches";
import { ContextsProvider } from "./contexts/ContextsProvider";
import { SetupPwa } from "./components/SetupPwa/SetupPwa";

export function App() {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    if (!document.startViewTransition) {
      setIsMounted(true);
      return;
    }
    document.startViewTransition(() => {
      setIsMounted(true);
    });
  });

  return (
    <Show when={isMounted()}>
      <ContextsProvider>
        <SetupPwa>
          <ClockSwitches />
          <Controls />
          <Toaster position="bottom-center" />
        </SetupPwa>
      </ContextsProvider>
    </Show>
  );
}
