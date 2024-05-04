import type { JSX } from "solid-js";

import styles from "./PlayerSettings.module.scss";
import { createUniqueId } from "solid-js";

type ValueMinMax = {
  value: number;
  min: number;
  max: number;
};

type PlayerSettingsProps = {
  startTime: ValueMinMax;
  incrementBy: ValueMinMax;
  legend: string;
  onChangeStartTime: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  onChangeIncrementBy: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
};

export const PlayerSettings = (props: PlayerSettingsProps) => {
  const componentUniqueId = createUniqueId();
  return (
    <fieldset class={styles.container}>
      <legend>{props.legend}</legend>
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
          min={props.startTime.min}
          max={props.startTime.max}
          value={props.startTime.value.toString()}
          onChange={props.onChangeStartTime}
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
          value={props.incrementBy.value.toString()}
          min={props.incrementBy.min}
          max={props.incrementBy.max}
          onChange={props.onChangeIncrementBy}
        />
      </div>
    </fieldset>
  );
};
