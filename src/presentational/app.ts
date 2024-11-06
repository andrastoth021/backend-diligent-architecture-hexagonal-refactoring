import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import cors from '@fastify/cors';
import { PathLike } from 'node:fs';
import { JsonFileStore } from '../utils/json-file-store';
import { Pet } from '../business/pet-type';
import { PetService } from '../business/pet-service';
import { postPetSchema } from './route-schemas';

export default async function createApp(options = {}, dataFilePath: PathLike) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>()
  await app.register(cors, {});

  const petStore = new JsonFileStore<Pet>(dataFilePath);

  app.post(
    '/pets',
    { schema: postPetSchema },
    async (request, reply) => {
      // get info from request
      const { name } = request.body

      // do the business logic
      const petService = new PetService(petStore);
      const newPet = petService.born(name);

      // create a HTTP response
      reply.status(201);
      return newPet;
    }
  )

  app.get(
    '/pets',
    async () => {
      const petService = new PetService(petStore)
      const pets = await petService.herdAll();
      return pets;
    }
  )

  return app;
}