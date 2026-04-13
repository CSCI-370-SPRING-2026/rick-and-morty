import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { use, useEffect, useState } from "react";
import { Character } from "@/interfaces/interfaces";
import { fetchCharacters } from "@/services/api";
import { RenderCharacter } from "@/components/RenderCharacter";
import { addCharToDb, getCharsFromDb, initDatabase } from "@/database/db";
import { useFocusEffect } from 'expo-router';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default function HomeScreen() {
  // Update to fetch characters from the API and store them in state
  // Pass the characters to the FlatList and render them using the RenderCharacter component
  const [characters, setCharacters] = useState<Character[]>([]);
  
  // Use useEffect to fetch characters when the component mounts
  useEffect(() => {
    const getCharacters = async () => {
      const chars = await fetchCharacters();

      for (const char of chars) {
        try {
          await addCharToDb(char);
        } catch (e) {
          console.log("Error adding character to DB: ", e);
        }
      }
      setCharacters(chars);
    };
    // when app starts, call and run initDB
    initDatabase();
    
    getCharacters();
    
  }, []);

  useFocusEffect(() => {
    const loadCharacters = async () => {
      const chars = await getCharsFromDb();
      setCharacters(chars);
    }
    loadCharacters();
  });

  return (
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderCharacter item={item} />}
      />
  );
}
