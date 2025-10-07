export interface RecordHandler<T> {
  get(): Promise<T | undefined>;
  set(record: T): Promise<void>;
}
