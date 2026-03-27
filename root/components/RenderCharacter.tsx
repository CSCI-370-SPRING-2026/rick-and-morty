import { Character } from "@/interfaces/interfaces";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export function RenderCharacter({ item }: { item: Character }) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [fav, isFav] = useState<boolean | null>(null);



    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 60, height: 60 }}
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text>{item.name}</Text>
          <Text>{item.species}</Text>
        </View>

        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={{ fontSize: 24 }}>
            {isFavorite ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }