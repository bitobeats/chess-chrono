import { ContextsProvider } from "../contexts/ContextsProvider";
import { Controls } from "./Controls";
import { ClockSwitches } from "./ClockSwitches";

export const Main = () => {
  return (
    <ContextsProvider>
      <ClockSwitches />
      <Controls />
    </ContextsProvider>
  );
};
