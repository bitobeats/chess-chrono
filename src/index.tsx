/* @refresh reload */
import { render } from "solid-js/web";

import { App } from "./solid/App";

const root = document.getElementById("root");

render(() => <App />, root!);
