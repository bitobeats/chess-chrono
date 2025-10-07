import type { RecordHandler } from "../model/RecordHandler";
import type { Session } from "./types/Session";

import { DEFAULT_SESSION } from "./consts";

type SessionManagerParams = {
  recordHandler: RecordHandler<Session>;
  defaultSession?: Session;

  getActivePlayer: () => 1 | 2;
  getPlayersStartTimes: () => [number, number];
  getPlayersRemainingTimes: () => [number, number];
};

export class SessionManager {
  #recordHandler: RecordHandler<Session>;
  #session: Session;

  #getActivePlayer: SessionManagerParams["getActivePlayer"];
  #getPlayersStartTimes: SessionManagerParams["getPlayersStartTimes"];
  #getPlayersRemainingTimes: SessionManagerParams["getPlayersRemainingTimes"];

  constructor({
    recordHandler,
    defaultSession,
    getActivePlayer,
    getPlayersRemainingTimes,
    getPlayersStartTimes,
  }: SessionManagerParams) {
    this.#recordHandler = recordHandler;
    this.#session = defaultSession ?? DEFAULT_SESSION;
    this.#getActivePlayer = getActivePlayer;
    this.#getPlayersStartTimes = getPlayersStartTimes;
    this.#getPlayersRemainingTimes = getPlayersRemainingTimes;
  }

  async init(): Promise<Session> {
    this.#session = (await this.#recordHandler.get()) ?? DEFAULT_SESSION;

    document.addEventListener("visibilitychange", this.saveSession.bind(this));

    return this.#session;
  }

  async saveSession() {
    const [player1OriginalTime, player2OriginalTime] = this.#getPlayersStartTimes();
    const [player1RemainingTime, player2RemainingTime] = this.#getPlayersRemainingTimes();

    const shouldRestore = player1OriginalTime !== player1RemainingTime || player2OriginalTime !== player2RemainingTime;

    await this.#recordHandler.set({
      player1RemainingTime,
      player2RemainingTime,
      shouldRestore,
      activePlayer: this.#getActivePlayer(),
    });
  }
}
