export interface Repository<T> {
  list(): Promise<T[]>;
  insert(): Promise<void>;
  delete(): Promise<void>;
  getById(id: string): Promise<T>;
}
