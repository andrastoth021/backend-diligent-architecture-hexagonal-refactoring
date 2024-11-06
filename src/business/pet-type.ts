export type Pet = {
  id: number,
  name: string
  food: number,
  weight: number
  age: number,
}

export type CreatePet = Omit<Pet, 'id'>