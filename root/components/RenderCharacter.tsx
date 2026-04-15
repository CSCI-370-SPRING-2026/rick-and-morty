import { addFavToDb, deleteFavFromDb, isFavoritedInDb } from "@/database/db";
import { Character } from "@/interfaces/interfaces";
import { checkFavorite, toggleFavorite } from "@/storage/storage";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export const RenderCharacter = ({ item }: { item: Character }) => {
  // Update this Component to use the db functions to save, store, and remove favorite Characters

  const [fav, setFav] = useState<boolean | null>(null);
  // state to track if item is in favorites table
  const [inFavTable, setInFavTable] = useState<boolean>()

  useEffect(() => {
    const checkAndSetFavorite = async () => {
      const favorite = await checkFavorite(item);
      setFav(Boolean(favorite));
      // update useEffect to check if Char is in favorites table
      const inTable = await isFavoritedInDb(item.id)
      setInFavTable(inTable)
    };
    checkAndSetFavorite();
  }, [item]);

  //  if the char is already fav , remove from fav list
  // if char is not in fav list , add them to list
  const handleToggleFavorite = async () => {
    await toggleFavorite(item);
    const favorite = await checkFavorite(item);
    setFav(Boolean(favorite));
    
    // if inFavTable is true -> remove from the table
    // if inFavTable is false -> add to the table
    inFavTable ? removeFromDB() : addToDb()
  };

  const removeFromDB = async () => {
    await deleteFavFromDb(item.id)
    // update inFavTable status
    setInFavTable(false)
  }

  const addToDb = async () => {
  // add Character to DB (on Monday set up to also remove)
    await addFavToDb(item)
    // update inFavTable status
    setInFavTable(true)
  }

  console.log("inFavTable: ", item.name, inFavTable)
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text>{item.name}</Text>
        <Text>{item.species}</Text>
      </View>

      <TouchableOpacity onPress={() => handleToggleFavorite()}>
        <Text style={{ fontSize: 24 }}>{inFavTable ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </View>
  );
};
