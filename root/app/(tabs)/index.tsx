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
import { initDatabase } from "@/database/db";

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
      setCharacters(chars);
    };
    getCharacters();
    // when app starts, call and run initDB
    initDatabase();
  }, []);

  return (
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderCharacter item={item} />}
      />
  );
}
