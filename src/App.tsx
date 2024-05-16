import { Toaster } from "solid-toast";
import { ContextsProvider } from "./contexts/ContextsProvider";
import { Controls } from "./components/Controls/Controls";
import { ClockSwitches } from "./components/ClockSwitches/ClockSwitches";

import { setupPwa } from "./setupPwa";

export function App() {
  setupPwa();
  return (
    <ContextsProvider>
      <ClockSwitches />
      <Controls />
      <Toaster position="top-center" />
    </ContextsProvider>
  );
}
