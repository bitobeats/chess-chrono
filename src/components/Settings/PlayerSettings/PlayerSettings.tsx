import type { Player } from "../../../libs/chess-clock-service/types/Player";

import styles from "./PlayerSettings.module.scss";

import { createUniqueId, createSignal } from "solid-js";
import { useSettingsStoreContext } from "../../../contexts/SettingsStoreContext";
import { useChessClockStoreContext } from "../../../contexts/ChessClockStoreContext";
import { useStartTimeInputMask } from "./useStartTimeInputMask";
import { convertFormattedTimeToSeconds } from "./convertFormattedTimeToSeconds";
import { formatTimeToHoursMinutesSeconds } from "../../../utils/formatTimeToHoursMinutesSeconds";

type PlayerSettingsProps = {
  player: Player;
};

export const PlayerSettings = (props: PlayerSettingsProps) => {
  const [startTimeInputRef, setStartTimeInputRef] = createSignal<HTMLInputElement>();
  useStartTimeInputMask(startTimeInputRef);

  const componentUniqueId = createUniqueId();

  const { saveSettings, setSettings, settings } = useSettingsStoreContext();
  const { chessClockStore } = useChessClockStoreContext();

  const legend = `Player ${props.player}`;
  const playerKey = `player${props.player}` as `player${1 | 2}`;

  function handleOnClick(ev: MouseEvent & { currentTarget: HTMLInputElement }) {
    ev.currentTarget.select();
  }

  function passConfirmationGuard(target: HTMLInputElement, oldValue: string) {
    if (chessClockStore.chessClockState === "suspended") {
      const confirmChangeSetting = confirm(
        "There's a game going on. If you change this setting, the game will be restarted with the new settings."
      );

      if (!confirmChangeSetting) {
        target.value = oldValue;
        return false;
      }
    }

    return true;
  }

  async function onChangeStartTime(event: Event & { currentTarget: HTMLInputElement }) {
    if (!passConfirmationGuard(event.currentTarget, formatTimeToHoursMinutesSeconds(settings[playerKey].startTime))) {
      return;
    }

    let convertedTime = convertFormattedTimeToSeconds(event.currentTarget.value);

    if (Number.isNaN(convertedTime)) {
      convertedTime = 600;
    }

    setSettings(playerKey, "startTime", convertedTime);
    await saveSettings();
  }

  async function onChangeIncrementBy(event: Event & { target: HTMLInputElement }) {
    if (!passConfirmationGuard(event.target, settings[playerKey].incrementBy.toString())) {
      return;
    }

    setSettings(playerKey, "incrementBy", parseInt(event.target.value));
    await saveSettings();
  }

  return (
    <div class={styles.container}>
      <span class={styles.label}>{legend}</span>
      <fieldset class={styles.fieldset}>
        <div class={styles.settingContainer}>
          <label class={styles.label} for={`startTime-${componentUniqueId}`}>
            Start time
          </label>
          <input
            ref={setStartTimeInputRef}
            class={styles.input}
            type="text"
            inputMode="numeric"
            placeholder="HH:MM:SS"
            id={`startTime-${componentUniqueId}`}
            name="startTime"
            value={formatTimeToHoursMinutesSeconds(settings[playerKey].startTime)}
            onChange={onChangeStartTime}
            onClick={handleOnClick}
          />
        </div>

        <div class={styles.settingContainer}>
          <label class={styles.label} for={`incrementBy-${componentUniqueId}`}>
            Increment by (seconds)
          </label>
          <input
            class={styles.input}
            type="number"
            inputMode="numeric"
            placeholder="0"
            id={`incrementBy-${componentUniqueId}`}
            name="incrementBy"
            value={settings[playerKey].incrementBy.toString()}
            min={0}
            max={36000}
            onChange={onChangeIncrementBy}
            onClick={handleOnClick}
          />
        </div>
      </fieldset>
    </div>
  );
};
