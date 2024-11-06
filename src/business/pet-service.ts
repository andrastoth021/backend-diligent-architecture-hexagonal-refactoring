import { PetRepository } from "../data-access/pet-repository";
import { JsonFileStore } from "../utils/json-file-store";
import { CreatePet, Pet } from "./pet-type";

export class PetService {
  private readonly repository;


  constructor(store: JsonFileStore<Pet>) {
    this.repository = new PetRepository(store);
  }

  async born(name: string) {
    // business logic
    const petProperties: CreatePet = {
      name,
      food: 1,
      weight: 1,
      age: 1
    }
    const created = this.repository.create(petProperties)

    return created;
  }

  async herdAll() {
    return await this.repository.readAll();
  }
}