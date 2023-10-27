export type Sex = 'Male' | 'Female';
export type AnimalType = 'dog' | 'cat';

export interface Animals {
  id: number
  sex: Sex,
  breed: string | null,
  name: string,
  phoneNumber: string,
  photo: string
  animalType: AnimalType,
}
