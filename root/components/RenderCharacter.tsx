import { addFavToDb, deleteFavFromDb } from "@/database/db";
import { Character } from "@/interfaces/interfaces";
import { checkFavorite, toggleFavorite } from "@/storage/storage";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export const RenderCharacter = ({ item }: { item: Character }) => {
  // Update this Component to use the db functions to save, store, and remove favorite Characters

  const [fav, setFav] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAndSetFavorite = async () => {
      const favorite = await checkFavorite(item);
      setFav(Boolean(favorite));
    };
    checkAndSetFavorite();
  }, [item]);

  //  if the char is already fav , remove from fav list
  // if char is not in fav list , add them to list
  const handleToggleFavorite = async () => {
    await toggleFavorite(item);
    const favorite = await checkFavorite(item);
    setFav(Boolean(favorite));
    // add Character to DB (on Monday set up to also remove)
    await addFavToDb(item)
  };

  const removeFromDB = async () => {
    await deleteFavFromDb(item.id)
  }

  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.species}</Text>
      </View>

      <TouchableOpacity onPress={() => removeFromDB()}>
        <Text style={{ fontSize: 24 }}>{fav ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </View>
  );
};
