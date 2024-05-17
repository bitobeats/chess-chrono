import { Toaster } from "solid-toast";
import { Controls } from "./components/Controls/Controls";
import { ClockSwitches } from "./components/ClockSwitches/ClockSwitches";
import { ContextsProvider } from "./contexts/ContextsProvider";
import { SetupPwa } from "./components/SetupPwa/SetupPwa";

export function App() {
  return (
    <ContextsProvider>
      <SetupPwa>
        <ClockSwitches />
        <Controls />
        <Toaster position="top-center" />
      </SetupPwa>
    </ContextsProvider>
  );
}
