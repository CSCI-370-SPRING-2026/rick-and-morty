import { Character } from "@/interfaces/interfaces";
import { checkFavorite, toggleFavorite } from "@/storage/storage";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export const RenderCharacter = ({ item }: { item: Character }) => {
  const [fav, setFav] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAndSetFavorite = async () => {
      const favorite = await checkFavorite(item);
      setFav(Boolean(favorite));
    };
    checkAndSetFavorite();
  }, [item]);

  const handleToggleFavorite = async () => {
    await toggleFavorite(item);
    const favorite = await checkFavorite(item);
    setFav(Boolean(favorite));
  };

  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.species}</Text>
      </View>

      <TouchableOpacity onPress={() => handleToggleFavorite()}>
        <Text style={{ fontSize: 24 }}>{fav ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </View>
  );
};
