import type { ParentComponent } from "solid-js";

import styles from "./SetupPwa.module.scss";

import { useRegisterSW } from "virtual:pwa-register/solid";
import { createEffect, on } from "solid-js";
import toast from "solid-toast";
import { useChessClockStoreContext } from "../../contexts/ChessClockStoreContext";

import { UpdateNeededTooltipBody } from "../Toast/UpdateNeededTooltipBody/UpdateNeededTooltipBody";

export const SetupPwa: ParentComponent = (props) => {
  const { chessClockStore } = useChessClockStoreContext();

  const {
    updateServiceWorker,
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
  } = useRegisterSW();

  createEffect(
    on([needRefresh], () => {
      if (needRefresh() && chessClockStore.chessClockState === "ready") {
        const updateToast = toast(
          <UpdateNeededTooltipBody update={updateServiceWorker} cancel={() => toast.dismiss(updateToast)} />,
          {
            className: styles.tooltip,
            duration: 99999,
          }
        );
      }
    })
  );

  createEffect(
    on([offlineReady], () => {
      if (offlineReady() && chessClockStore.chessClockState === "ready") {
        toast.success("Ready to use offline! Add the app to the homescreen for the best experience.", {
          className: styles.tooltip,
          duration: 5000,
        });
      }
    })
  );

  return props.children;
};
