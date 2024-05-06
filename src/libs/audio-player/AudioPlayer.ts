import clockSwitchAudioCaf from "../../assets/audio/switch-toggle.caf?raw";
import clockSwitchAudioWebm from "../../assets/audio/switch-toggle.webm";

export class AudioPlayer {
  #audioCtx: AudioContext | null = null;
  #switchAudioArrayBuffer: ArrayBuffer | null = null;
  #switchAudioBuffer: AudioBuffer | null = null;
  #initialized: boolean = false;

  async init() {
    if (this.#initialized) {
      return;
    }

    await this.#preloadAssets();

    if (!this.#switchAudioArrayBuffer) {
      return;
    }

    const offlineContext = new OfflineAudioContext({ numberOfChannels: 1, sampleRate: 48000, length: 1 });

    this.#switchAudioBuffer = await offlineContext.decodeAudioData(this.#switchAudioArrayBuffer);

    this.#initialized = true;
  }

  async play() {
    if (!this.#initialized) {
      throw new Error("AudioPlayer must be initialized first");
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
    const canPlayXCaf = new Audio().canPlayType("audio/x-caf");
    const switchAudioData = await fetch(canPlayXCaf ? clockSwitchAudioCaf : clockSwitchAudioWebm);
    this.#switchAudioArrayBuffer = await switchAudioData.arrayBuffer();
  }
}
