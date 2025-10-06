type DbRecordHandlerParams = {
  db: IDBDatabase;
  storeName: string;
  recordName: string;
};

export class DbRecordHandler<T> {
  #db: IDBDatabase;
  #storeName: string;
  #recordName: string;

  constructor({ db, recordName, storeName }: DbRecordHandlerParams) {
    this.#db = db;
    this.#storeName = storeName;
    this.#recordName = recordName;
  }

  async get(): Promise<T | undefined> {
    const store = await this.#getObjectStore("readonly");

    return new Promise<T>((res, rej) => {
      const transaction = store.get(this.#recordName);

      transaction.onsuccess = () => {
        res(transaction.result);
      };

      transaction.onerror = () => {
        rej(transaction.error);
      };
    });
  }

  async set(persistentObject: T) {
    const store = await this.#getObjectStore("readwrite");

    return new Promise<void>((res, rej) => {
      const transaction = store.put(persistentObject, this.#recordName);

      transaction.onsuccess = () => {
        res();
      };

      transaction.onerror = () => {
        rej(transaction.error);
      };
    });
  }

  async #getObjectStore(transactionMode: IDBTransactionMode) {
    return this.#db.transaction(this.#storeName, transactionMode).objectStore(this.#storeName);
  }
}
