import styles from "./styles/setupPwa.module.scss";

import { createEffect } from "solid-js";
import toast from "solid-toast";
import { useRegisterSW } from "virtual:pwa-register/solid";

import { UpdateNeededTooltipBody } from "./components/Toast/UpdateNeededTooltipBody/UpdateNeededTooltipBody";

export function setupPwa() {
  const {
    updateServiceWorker,
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
  } = useRegisterSW();

  createEffect(() => {
    if (needRefresh()) {
      const updateToast = toast(
        <UpdateNeededTooltipBody update={updateServiceWorker} cancel={() => toast.dismiss(updateToast)} />,
        { iconTheme: { primary: "black", secondary: "white" }, className: styles.tooltip, duration: 99999 }
      );
    }
  });

  createEffect(() => {
    if (offlineReady()) {
      toast.success("Ready to use offline! Add the app to the homescreen for the best experience.", {
        className: styles.tooltip,
        duration: 5000,
      });
    }
  });
}
