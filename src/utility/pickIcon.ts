import { AnimalType, Gender } from '../types/animals';
import female from '../assets/female.svg';
import mala from '../assets/male.svg';
import cat from '../assets/cat.svg';
import dog from '../assets/dog.svg';

export const gender = (sex: Gender): string => {
  return sex === 'Female' ? female : mala;
}

export const petType = (animal: AnimalType): string => {
  return animal === 'cat' ? cat : dog;
}

export const firstLetterUpperCase = (str: string | null): string | null => {
  if (!str) {
    return null;
  }
  const cutFirstLetter = str.slice(1);
  return str[0].toUpperCase().concat(cutFirstLetter);
}
