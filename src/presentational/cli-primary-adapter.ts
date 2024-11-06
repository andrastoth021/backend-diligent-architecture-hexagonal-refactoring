import PromptSync from 'prompt-sync';
import { PetManagementPrimaryPort, PetService } from '../business/pet-service';

export function runCLIApp(petService: PetManagementPrimaryPort) {
  const prompt = PromptSync();
  console.log(
    "Please choose one:\n" +
    "1. Herd all!\n" +
    "2. Born pet!"
  );

  let input = prompt("Your choice: ");
  let choice = parseInt(input);

  if (choice === 1) herdAll(petService);
  else if (choice === 2) petBorn(petService);
  else console.log("Try again!");
}

async function herdAll(petService: PetManagementPrimaryPort) {
  console.log("Heard all NOW!")
  const pets = await petService.herdAll();
  console.log(pets);
}

async function petBorn(petService: PetManagementPrimaryPort) {
  const prompt = PromptSync();
  let input: string | null = null;
  
  do {
    input = prompt("Please provide a name: ");
    if (typeof input === "string" && input.length > 1) {
      const newPet = await petService.born(input);
      console.log(newPet);
    }
  } while (input !== null && input.length < 1);
}
