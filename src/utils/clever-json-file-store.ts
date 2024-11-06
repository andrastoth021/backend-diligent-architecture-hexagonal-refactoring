import { existsSync, PathLike, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const setTrue = () => true;


export class CleverJsonFileStore<T, K extends keyof T> {
  constructor(private readonly path: PathLike) {
    if(!existsSync(this.path)) {
      writeFileSync(this.path, '[]', 'utf-8');
    }
  }

  async find(filterBy: (item: T) => boolean = setTrue) {
    const items = await this.read();
    const filtered = items.filter(filterBy);
    return  filtered
  }

  async create(item: T) {
    const items = await this.read();
    items.push(item);
    await this.write(items);
    return item;
  }

  async remove(removeBy: (item: T) => boolean) {
    const items = await this.read();
    const filtered = items.filter(item => !removeBy(item))
    await this.write(filtered);
  }

  async replace(replaceBy: (item: T) => boolean, replaceTo: T) {
    const items = await this.read();
    const replaced = items.map((item) => replaceBy(item) ? replaceTo : item)
    await this.write(replaced);
    return replaceTo;
  }

  private async read() {
    const content = await readFile(this.path, 'utf-8');
    const data = JSON.parse(content) as T[];
    return data 
  }
  
  private async write(data: T[]) {
    const content = JSON.stringify(data, null, 2);
    await writeFile(this.path, content, 'utf-8');
  }
}
