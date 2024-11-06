import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import cors from '@fastify/cors';
import { PathLike } from 'node:fs';
import { JsonFileStore } from '../utils/json-file-store';
import { Pet } from '../business/pet-type';
import { PetService } from '../business/pet-service';
import { postPetSchema } from './route-schemas';
import { PetStoreSecondaryAdapter } from '../data-access/pet-store-secondary-adapter';

export default async function createApp(options = {}, dataFilePath: PathLike) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>()
  await app.register(cors, {});

  const petStore = new JsonFileStore<Pet>(dataFilePath);

  const secondaryAdapter = new PetStoreSecondaryAdapter(petStore);
  const petService = new PetService(secondaryAdapter);

  app.post(
    '/pets',
    { schema: postPetSchema },
    async (request, reply) => {
      const { name } = request.body;
      const newPet = petService.born(name);

      reply.status(201);
      return newPet;
    }
  )

  app.get(
    '/pets',
    async () => {
      const pets = await petService.herdAll();
      return pets;
    }
  )

  return app;
}