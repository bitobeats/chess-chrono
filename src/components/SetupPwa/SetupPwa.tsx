import type { ParentComponent } from "solid-js";

import styles from "./SetupPwa.module.scss";

import { useRegisterSW } from "virtual:pwa-register/solid";
import { createEffect, on } from "solid-js";
import toast from "solid-toast";
import { useChessClockStoreContext } from "../../contexts/ChessClockStoreContext";
import { UpdateNeededTooltipBody } from "../Toast/UpdateNeededTooltipBody/UpdateNeededTooltipBody";
import { OfflineReadyTooltipBody } from "../Toast/OfflineReadyTooltipBody/OfflineReadyTooltipBody";

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
            duration: Infinity,
          }
        );
      }
    })
  );

  createEffect(
    on([offlineReady], () => {
      if (offlineReady() && chessClockStore.chessClockState === "ready") {
        const offlineReadyToast = toast(<OfflineReadyTooltipBody close={() => toast.dismiss(offlineReadyToast)} />, {
          className: styles.tooltip,
          duration: 6000,
        });
      }
    })
  );

  return props.children;
};
