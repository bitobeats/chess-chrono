import styles from "./styles/setupPwa.module.scss";

import { useRegisterSW } from "virtual:pwa-register/solid";
import { createEffect, on } from "solid-js";
import toast from "solid-toast";
import { useChessClockStoreContext } from "./contexts/ChessClockStoreContext";

import { UpdateNeededTooltipBody } from "./components/Toast/UpdateNeededTooltipBody/UpdateNeededTooltipBody";

export function setupPwa() {
  const { chessClockStore } = useChessClockStoreContext();

  const {
    updateServiceWorker,
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
  } = useRegisterSW();

  createEffect(
    on([needRefresh], () => {
      console.log("need refresh", needRefresh());
      if (needRefresh() && chessClockStore.chessClockState === "ready") {
        const updateToast = toast(
          <UpdateNeededTooltipBody update={updateServiceWorker} cancel={() => toast.dismiss(updateToast)} />,
          { iconTheme: { primary: "black", secondary: "white" }, className: styles.tooltip, duration: 99999 }
        );
      }
    })
  );

  createEffect(
    on([needRefresh], () => {
      if (offlineReady() && chessClockStore.chessClockState === "ready") {
        toast.success("Ready to use offline! Add the app to the homescreen for the best experience.", {
          className: styles.tooltip,
          duration: 5000,
        });
      }
    })
  );
}
