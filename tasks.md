# Tasks

## Background

- We are going to create a server that manage a pet keeping application, like Tamagochies, similar to Tetova Teve Club, Hosemberkepzo.
- The user can create a new pet.
- The user can get the list of pets.
- The user can get the status of one pet.
- The user the can feed a given pet.
- The user can make older a pet of one day.

When a day passes, the pet behaves like this:

- If there is food in front of it, it eats it. Hence the food is decreased by one and its weight increased by one.
- If there is no food in front of the pet, its weight is decreased by one if at least it has one weight.
- If the pet's weight goes to zero, unfortunately it is dead.
- When a pet is dead it is not possible to feed them or make it older.

## Task 1: Refactor the code to Hexagonal Architecture

- Define the primary and secondary ports.
- Presentational components will be the primary adapters.
- Data Access components will be the secondary adapters.
- glue code will be in the server.ts

Hint: The first step is to define the interfaces for the ports. The architecture will hold your hands through these interfaces.

Hint: The dir structure can help you a lot. The data-access dir's content belongs to logically the secondary adapters, the presentational dir contains the primary adapters.

Hint: The primary adapters are using the primary ports through the interfaces. Therefore you need to pass the instance of the given interface to the adapter (as function or constructor args).

Hint: The secondary adapters are used by the business logic through the secondary port's interfaces. Therefore the secondary adapters are implements the secondary ports' interface.

## Task 2: Refactor the tests to not use physical JSON files

- Create an in memory Pet Repository Adapter and use it in the tests.

## Task 3: Add a cli interface for this app

Create a `cli.ts` Next to the server TS. Create a CliPrimaryAdapter which uses the PetServicePort to invoke the proper functions based on the arguments.

## Task 4: Connect the Clever JSON file store

We have another library the Clever JSON File Store.

With it you can:
- create a new item
- remove one or more items by providing a function to decide what to remove.
- replace one or more items by providing a function to decide what to replace.
- find one or more item by providing a function to decide what to include into the results.

Create an adapter for this library and use it instead of the
simple JSON file store.

## Task 5: Implement the missing features

- Implement the missing features for the Pet App in this architecture.


