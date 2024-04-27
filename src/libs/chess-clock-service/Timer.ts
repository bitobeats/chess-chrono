import type { TimerConfig } from "./types/TimerConfig";

import { SimpleEventTarget } from "vrls-simple-event-target";

type TimerEventMap = {
  finish: () => void;
};
export class Timer extends SimpleEventTarget<TimerEventMap> {
  #accumulatedTime: number = 0;
  #lastTimestamp: number = 0;
  #isRunning: boolean = false;
  #finishCheckerTimeout: number | null = null;

  constructor(public timerConfig: TimerConfig) {
    super(["finish"]);
  }

  get remainingTime() {
    if (this.#isRunning) {
      this.#accumulateTime();
    }

    const currentTime = this.timerConfig.countdownFrom - this.#accumulatedTime;
    return currentTime > 0 ? currentTime : 0;
  }

  get isRunning() {
    return this.#isRunning;
  }

  start() {
    this.#isRunning = true;
    this.#lastTimestamp = performance.now();

    const finishChecker = () => {
      if (this.remainingTime <= 0) {
        this.pause();
        this.dispatchEvent("finish");
      } else {
        this.#finishCheckerTimeout = setTimeout(finishChecker, this.remainingTime * 1000);
      }
    };

    finishChecker();
  }

  pause(increment?: boolean) {
    this.#isRunning = false;

    if (increment) {
      this.#increment();
    }

    clearTimeout(this.#finishCheckerTimeout ?? undefined);
  }

  reset() {
    this.#accumulatedTime = 0;
    clearTimeout(this.#finishCheckerTimeout ?? undefined);
  }

  #increment() {
    this.#accumulatedTime -= this.timerConfig.incrementBy;
  }

  #accumulateTime() {
    const now = performance.now();
    const elapsedTime = (now - this.#lastTimestamp) / 1000;

    this.#lastTimestamp = now;
    this.#accumulatedTime += elapsedTime;
  }
}
