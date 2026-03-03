import type { TimerConfig } from "./types/TimerConfig";

import { SimpleEventTarget } from "@bitobeats/simple-event-target";

type TimerEventMap = {
  finish: () => void;
};

export class Timer extends SimpleEventTarget<TimerEventMap> {
  #accumulatedTime: number = 0;
  #lastTimestamp: number = 0;
  #isRunning: boolean = false;
  #finishCheckerTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(public timerConfig: TimerConfig) {
    super(["finish"]);
  }

  get remainingTime() {
    const liveElapsedTime = this.#isRunning ? this.#elapsedSinceLastTimestamp() : 0;
    const currentTime = this.timerConfig.countdownFrom - this.#accumulatedTime - liveElapsedTime;
    return currentTime > 0 ? currentTime : 0;
  }

  get isRunning() {
    return this.#isRunning;
  }

  start() {
    this.#isRunning = true;
    this.#lastTimestamp = performance.now();

    this.#finishChecker();
  }

  pause(increment?: boolean) {
    if (this.#isRunning) {
      this.#accumulatedTime += this.#elapsedSinceLastTimestamp();
    }

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

  loadSession(time: number) {
    this.#accumulatedTime = this.timerConfig.countdownFrom - time;
  }

  #increment() {
    this.#accumulatedTime -= this.timerConfig.incrementBy;
  }

  #elapsedSinceLastTimestamp() {
    const now = performance.now();
    return (now - this.#lastTimestamp) / 1000;
  }

  #finishChecker = () => {
    const remainingTime = this.remainingTime;

    if (remainingTime <= 0) {
      this.pause();
      this.dispatchEvent("finish");
    } else {
      this.#finishCheckerTimeout = setTimeout(this.#finishChecker, remainingTime * 1000);
    }
  };
}
