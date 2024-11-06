
export class InMemoryFileStore<T> {
  private items: T[]=[]

  async get() {
    return structuredClone(this.items);
  }
  async set(data: T[]) {
    this.items = structuredClone(data);
  } 
}