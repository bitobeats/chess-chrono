import { CLOCK_TOGGLE_AUDIO_URL_CAF, CLOCK_TOGGLE_AUDIO_URL_WEBM } from "../../const/CLOCK_TOGGLE_AUDIO_URL";

export class AudioPlayer {
  #audioCtx: AudioContext | null = null;
  #switchAudioArrayBuffer: ArrayBuffer | null = null;
  #switchAudioBuffer: AudioBuffer | null = null;
  #initialized: boolean = false;
  #assetsPreloaded: boolean = false;

  async init() {
    if (this.#initialized) {
      return;
    }

    if (!this.#assetsPreloaded) {
      await this.#preloadAssets();
    }

    if (!this.#switchAudioArrayBuffer) {
      return;
    }

    const offlineContext = new OfflineAudioContext({ numberOfChannels: 1, sampleRate: 48000, length: 1 });

    this.#switchAudioBuffer = await offlineContext.decodeAudioData(this.#switchAudioArrayBuffer);

    this.#initialized = true;
  }

  async play() {
    if (!this.#initialized) {
      await this.init();
    }
    if (!this.#audioCtx) {
      this.#audioCtx = new AudioContext();
    }

    if (this.#audioCtx.state === "suspended") {
      await this.#audioCtx.resume();
    }

    const bufferSource = this.#audioCtx.createBufferSource();
    bufferSource.buffer = this.#switchAudioBuffer;
    bufferSource.connect(this.#audioCtx.destination);
    bufferSource.playbackRate.value = this.#getRandomNumber();
    bufferSource.start();
  }

  async suspend() {
    await this.#audioCtx?.suspend();
  }

  #getRandomNumber(): number {
    const min = 1;
    const max = 1.1;
    return Math.random() * (max - min) + min;
  }

  async #preloadAssets() {
    if (this.#assetsPreloaded) {
      return;
    }

    const canPlayXCaf = new Audio().canPlayType("audio/x-caf");
    const switchAudioData = await fetch(canPlayXCaf ? CLOCK_TOGGLE_AUDIO_URL_CAF : CLOCK_TOGGLE_AUDIO_URL_WEBM);
    this.#switchAudioArrayBuffer = await switchAudioData.arrayBuffer();
    this.#assetsPreloaded = true;
  }
}
