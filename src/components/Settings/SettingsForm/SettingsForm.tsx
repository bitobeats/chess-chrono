import type { Player } from "../../../libs/chess-clock-service/types/Player";

import styles from "./SettingsForm.module.scss";

import { GlobalSettings } from "../GlobalSettings/GlobalSettings";
import { PlayerSettings } from "../PlayerSettings/PlayerSettings";

type SettingsFormProps = {
  onCancel: () => void;
};

export const SettingsForm = (props: SettingsFormProps) => {
  let formRef!: HTMLFormElement;

  const players: Player[] = [1, 2];

  return (
    <form ref={formRef} class={styles.form} autocomplete="off">
      <div class={styles.playerSettingsContainer}>
        {players.map((player) => (
          <PlayerSettings player={player} />
        ))}
      </div>

      <GlobalSettings />

      <menu class={styles.optionsMenu}>
        <button class={styles.closeButton} type="button" onClick={props.onCancel} autofocus>
          Ok
        </button>
      </menu>
    </form>
  );
};
