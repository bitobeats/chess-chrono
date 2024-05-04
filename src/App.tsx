import { ContextsProvider } from "./contexts/ContextsProvider";
import { Controls } from "./components/Controls";
import { ClockSwitches } from "./components/ClockSwitches";

export function App() {
  return (
    <ContextsProvider>
      <ClockSwitches />
      <Controls />
    </ContextsProvider>
  );
}
