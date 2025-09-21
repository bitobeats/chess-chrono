export class CustomWakeLock {
  #supported: boolean;
  #MAX_TRIES: number = 5;
  #triedTimes: number = 0;
  #wakeLockSentinel: WakeLockSentinel | null = null;

  constructor() {
    this.#supported = "wakeLock" in navigator;
  }

  async requestWakeLock() {
    if (!this.#supported || this.#wakeLockSentinel || this.#triedTimes === this.#MAX_TRIES) {
      return;
    }

    try {
      this.#wakeLockSentinel = await navigator.wakeLock.request("screen");
      this.#wakeLockSentinel.addEventListener(
        "release",
        () => {
          this.#wakeLockSentinel = null;
        },
        { once: true }
      );
      this.#triedTimes = 0;
    } catch (err) {
      this.#triedTimes++;
    }
  }

  async releaseWakeLock() {
    if (!this.#supported || !this.#wakeLockSentinel) {
      return;
    }

    await this.#wakeLockSentinel.release();
  }
}
