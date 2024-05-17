import { Toaster } from "solid-toast";
import { Controls } from "./components/Controls/Controls";
import { ClockSwitches } from "./components/ClockSwitches/ClockSwitches";

import { setupPwa } from "./setupPwa";

export function App() {
  setupPwa();
  return (
    <>
      <ClockSwitches />
      <Controls />
      <Toaster position="top-center" />
    </>
  );
}
