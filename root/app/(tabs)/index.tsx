import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import { Character } from "@/interfaces/interfaces";
import { fetchCharacters } from "@/services/api";
import { RenderCharacter } from "@/components/RenderCharacter";
import { addCharToDb, getCharsFromDb, initDatabase } from "@/database/db";
import { useFocusEffect } from "expo-router";

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default function HomeScreen() {
  // Update to fetch characters from the API and store them in state
  // Pass the characters to the FlatList and render them using the RenderCharacter component
  const [characters, setCharacters] = useState<Character[]>([]);

  // Use useEffect to fetch characters when the component mounts
  // Add chars to characters db when app loads
  useEffect(() => {
    const getCharacters = async () => {
      const chars = await fetchCharacters();

      // loop through list of chars - add to db
      for (const char of chars) {
        await addCharToDb(char);
      }
      setCharacters(chars);
    };
    getCharacters();
    // when app starts, call and run initDB
    initDatabase();
  }, []);

  // when we come back to this page , load the characters from the database
  useFocusEffect(() => {
    const loadChars = async () => {
      const chars = await getCharsFromDb()
       // update characters state based on chars returned
       setCharacters(chars)
    }
  })

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RenderCharacter item={item} />}
    />
  );
}
