import { PromiseTaskQueue } from "@bitobeats/tasks";

const STORE_NAME = "persister-user";
const PERSISTENT_RECORD_NAME = "persistent-record";
export class PersistentRecord<T extends Record<string, unknown>> {
  #name: string;
  #taskQueue: PromiseTaskQueue;
  #cachedDb: IDBDatabase | null = null;
  #recordToPersist: T | null;

  constructor(name: string, recordToPersist: T) {
    this.#name = name;
    this.#recordToPersist = structuredClone(recordToPersist);
    this.#taskQueue = new PromiseTaskQueue();
  }

  async init() {
    const persistedObject = await this.get();
    this.#taskQueue.addEventListener("queuefinished", this.#closeDb.bind(this));

    if (!persistedObject && this.#recordToPersist) {
      await this.set(this.#recordToPersist);
    }

    this.#recordToPersist = null;
  }

  async get() {
    return this.#taskQueue.enqueue(async () => {
      const store = await this.#getObjectStore("readonly");

      return new Promise<T>((res, rej) => {
        const transaction = store.get(PERSISTENT_RECORD_NAME);

        transaction.onsuccess = () => {
          res(transaction.result);
        };

        transaction.onerror = () => {
          rej(transaction.error);
        };
      });
    });
  }

  async set(persistentObject: T) {
    this.#taskQueue.enqueue(async () => {
      const store = await this.#getObjectStore("readwrite");

      return new Promise<void>((res, rej) => {
        const transaction = store.put(persistentObject, PERSISTENT_RECORD_NAME);

        transaction.onsuccess = () => {
          res();
        };

        transaction.onerror = () => {
          rej(transaction.error);
        };
      });
    });
  }

  async #getDatabase() {
    if (!this.#cachedDb) {
      this.#cachedDb = await new Promise<IDBDatabase>((res, rej) => {
        const request = indexedDB.open(this.#name, 1);

        request.onerror = (e) => {
          rej(e);
        };

        request.onupgradeneeded = () => {
          request.result.createObjectStore(STORE_NAME);
        };

        request.onsuccess = () => {
          const database = request.result;
          res(database);
        };
      });
    }

    return this.#cachedDb;
  }

  async #getObjectStore(transactionMode: IDBTransactionMode) {
    const db = await this.#getDatabase();
    return db.transaction(STORE_NAME, transactionMode).objectStore(STORE_NAME);
  }

  #closeDb() {
    this.#cachedDb?.close();
    this.#cachedDb = null;
  }
}
