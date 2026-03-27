import { Character } from "../interfaces/interfaces";

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch(
    "https://rickandmortyapi.com/api/character"
  );

  // Update the function to return an array of Character objects instead of the raw API response
}