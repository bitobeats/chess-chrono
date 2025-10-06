import type { RecordHandler } from "../model/RecordHandler";
import type { StoresSpec } from "./types/StoreSpec";

import { DbRecordHandler } from "./DbRecordHandler";

type DatabaseParams = {
  name: string;
  version: number;
  onUpgradeNeeded: (openRequest: IDBOpenDBRequest, changeEvent: IDBVersionChangeEvent) => void;
};

export class Database<T extends StoresSpec> {
  #db: IDBDatabase | undefined;

  async init({ name, version, onUpgradeNeeded }: DatabaseParams) {
    this.#db = await new Promise((res, rej) => {
      const request = indexedDB.open(name, version);

      request.onerror = (error) => {
        rej(error);
      };

      request.onupgradeneeded = (event) => {
        onUpgradeNeeded(request, event);
      };

      request.onsuccess = () => {
        res(request.result);
      };
    });
  }

  createRecordHandler<S extends keyof T & string, R extends keyof T[S] & string>(
    store: S,
    record: R
  ): RecordHandler<T[S][R]> {
    return new DbRecordHandler<T[S][R]>({ db: this.#getDb(), storeName: store, recordName: record });
  }

  #getDb(): IDBDatabase {
    if (!this.#db) {
      throw new Error("Database not initialized");
    }
    return this.#db;
  }
}
