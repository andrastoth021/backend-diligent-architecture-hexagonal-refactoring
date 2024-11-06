import { join } from "node:path";
import { PetStoreSecondaryAdapter } from "./data-access/pet-store-secondary-adapter";
import { JsonFileStore } from "./utils/json-file-store";
import { Pet } from "./business/pet-type";
import { PetService } from "./business/pet-service";
import { runCLIApp } from "./presentational/cli-primary-adapter";

const dataFile = join(__dirname, '..', 'data.json')
const petStore = new JsonFileStore<Pet>(dataFile);

const secondaryAdapter = new PetStoreSecondaryAdapter(petStore);
const petService = new PetService(secondaryAdapter);
runCLIApp(petService);
