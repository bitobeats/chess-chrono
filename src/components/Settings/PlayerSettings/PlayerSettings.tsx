import type { Player } from "../../../libs/chess-clock-service/types/Player";

import styles from "./PlayerSettings.module.scss";

import { createUniqueId } from "solid-js";
import { useSettingsStoreContext } from "../../../contexts/SettingsStoreContext";
import { useChessClockStoreContext } from "../../../contexts/ChessClockStoreContext";

type PlayerSettingsProps = {
  player: Player;
};

export const PlayerSettings = (props: PlayerSettingsProps) => {
  const componentUniqueId = createUniqueId();
  const { saveSettings, setSettings, settings } = useSettingsStoreContext();
  const { chessClockStore } = useChessClockStoreContext();

  const legend = `Player ${props.player} settings`;
  const playerKey = `player${props.player}` as `player${1 | 2}`;

  function handleOnClick(ev: MouseEvent & { currentTarget: HTMLInputElement }) {
    ev.currentTarget.select();
  }

  async function onChangeStartTime(event: Event & { target: HTMLInputElement }) {
    if (!passConfirmationGuard(event.target, (settings[playerKey].startTime / 60).toString())) {
      return;
    }

    setSettings(playerKey, "startTime", parseFloat(event.target.value) * 60);
    await saveSettings();
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

  async function onChangeIncrementBy(event: Event & { target: HTMLInputElement }) {
    if (!passConfirmationGuard(event.target, settings[playerKey].incrementBy.toString())) {
      return;
    }

    setSettings(playerKey, "incrementBy", parseInt(event.target.value));
    await saveSettings();
  }

  return (
    <fieldset class={styles.container}>
      <legend>{legend}</legend>
      <div class={styles.settingContainer}>
        <label for={`startTime-${componentUniqueId}`}>Start time (minutes)</label>
        <input
          class={styles.input}
          type="number"
          inputMode="numeric"
          placeholder="10"
          id={`startTime-${componentUniqueId}`}
          name="startTime"
          step={0.01}
          min={0.1}
          max={600}
          value={(settings[`player${props.player}`].startTime / 60).toString()}
          onChange={onChangeStartTime}
          onClick={handleOnClick}
        />
      </div>

      <div class={styles.settingContainer}>
        <label for={`incrementBy-${componentUniqueId}`}>Increment by (seconds)</label>
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
  );
};
