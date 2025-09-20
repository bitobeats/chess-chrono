export class CustomWakeLock {
  #MAX_TRIES: number = 5;
  #triedTimes: number = 0;
  #wakeLockSentinel: WakeLockSentinel | null = null;

  async requestWakeLock() {
    if (this.#wakeLockSentinel || this.#triedTimes === this.#MAX_TRIES) {
      return;
    }

    try {
      this.#wakeLockSentinel = await navigator.wakeLock.request("screen");
      this.#triedTimes = 0;
    } catch (err) {
      this.#triedTimes++;
    }
  }

  async releaseWakeLock() {
    if (!this.#wakeLockSentinel) {
      return;
    }

    try {
      await this.#wakeLockSentinel.release();
    } finally {
      this.#wakeLockSentinel = null;
    }
  }
}
