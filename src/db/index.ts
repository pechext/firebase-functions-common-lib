export interface Repository<T> {
  list(): Promise<T[]>;
  insert(doc: T): Promise<string>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<T>;
  updateById(id: string, doc: T): Promise<void>;
}

