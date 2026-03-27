import { Character } from "../interfaces/interfaces";

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch(
    "https://rickandmortyapi.com/api/character"
  );

  const data = await res.json();
  // Rick and Morty API returns { info, results }, so FlatList needs data.results.
  return data.results as Character[];
}