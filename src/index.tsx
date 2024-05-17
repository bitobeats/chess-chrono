/* @refresh reload */
import { render } from "solid-js/web";

import { App } from "./App";
import "./styles/globals.scss";

import { ContextsProvider } from "./contexts/ContextsProvider";
// import "solid-devtools";

const root = document.getElementById("root");

render(
  () => (
    <ContextsProvider>
      <App />
    </ContextsProvider>
  ),
  root!
);
