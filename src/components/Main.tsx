import { ContextsProvider } from "../contexts/ContextsProvider";
import { Controls } from "./Controls";
import { ChessClock } from "./ChessClock";

export const Main = () => {
  return (
    <ContextsProvider>
      <ChessClock />
      <Controls />
    </ContextsProvider>
  );
};
