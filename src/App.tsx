import { ContextsProvider } from "./contexts/ContextsProvider";
import { Controls } from "./components/Controls/Controls";
import { ClockSwitches } from "./components/ClockSwitches/ClockSwitches";

export function App() {
  return (
    <ContextsProvider>
      <ClockSwitches />
      <Controls />
    </ContextsProvider>
  );
}
