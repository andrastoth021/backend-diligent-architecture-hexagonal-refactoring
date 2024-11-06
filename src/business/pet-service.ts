import { Pet } from "./pet-type";

export interface PetManagementPrimaryPort {
  born: (name: string) => Promise<Pet>;
  herdAll: () => Promise<Pet[]>;
}

export interface StorePetSecondaryPort {
  create(name: string): Promise<Pet>;
  readById(): void;
  readAll(): Promise<Pet[]>;
  update(): void;
  delete(): void;
}


export class PetService implements PetManagementPrimaryPort {
  private readonly store;

  constructor(store: StorePetSecondaryPort) {
    this.store = store;
  }

  async born(name: string) {
    const created = this.store.create(name);
    return created;
  }

  async herdAll() {
    return await this.store.readAll();
  }
}