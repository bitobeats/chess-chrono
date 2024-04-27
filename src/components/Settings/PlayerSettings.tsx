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
  onChangeStartTime: (value: string) => void;
  onChangeIncrementBy: (value: string) => void;
};

export const PlayerSettings = (props: PlayerSettingsProps) => {
  const componentUniqueId = createUniqueId();
  return (
    <fieldset class={styles.container}>
      <legend>{props.legend}</legend>
      <div class={styles.settingContainer}>
        <label for={`startTime-${componentUniqueId}`}>Start time (minutes)</label>
        <input
          type="number"
          inputMode="numeric"
          placeholder="10"
          id={`startTime-${componentUniqueId}`}
          name="startTime"
          step={0.01}
          min={props.startTime.min}
          max={props.startTime.max}
          value={props.startTime.value.toString()}
          onChange={(ev) => {
            props.onChangeStartTime(ev.target.value);
          }}
        />
      </div>

      <div class={styles.settingContainer}>
        <label for={`incrementBy-${componentUniqueId}`}>Increment by (seconds)</label>
        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          id={`incrementBy-${componentUniqueId}`}
          name="incrementBy"
          value={props.incrementBy.value.toString()}
          min={props.incrementBy.min}
          max={props.incrementBy.max}
          onChange={(ev) => props.onChangeIncrementBy(ev.target.value)}
        />
      </div>
    </fieldset>
  );
};
