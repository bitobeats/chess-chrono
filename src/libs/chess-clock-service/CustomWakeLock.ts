export class CustomWakeLock {
  #MAX_TRIES: number = 5;
  #triedTimes: number = 0;
  #wakeLockSentinel: WakeLockSentinel | null = null;

  async requestWakeLock() {
    if (this.#wakeLockSentinel || this.#triedTimes === this.#MAX_TRIES) {
      return;
    }

    try {
      const wakeLockSentinel = await navigator.wakeLock.request("screen");
      this.#wakeLockSentinel = wakeLockSentinel;
    } catch (err) {
      this.#MAX_TRIES = this.#MAX_TRIES + 1;
    }
  }

  async releaseWakeLock() {
    if (!this.#wakeLockSentinel || this.#triedTimes === this.#MAX_TRIES) {
      return;
    }

    try {
      await this.#wakeLockSentinel.release();
    } finally {
      this.#wakeLockSentinel = null;
    }
  }
}
