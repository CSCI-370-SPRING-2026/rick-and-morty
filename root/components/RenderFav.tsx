import { Character } from "@/interfaces/interfaces";
import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteFavFromDb, updateFavInDb } from "@/database/db";

// provide RenderFav function that can update favs Character [] state from parent
export default function RenderFav({
  favorite,
  onDelete,
  onUpdate,
}: {
  favorite: Character;
  onDelete: (id: number) => void;
  onUpdate: (char: Character) => void;
}) {
  // establish 3 states - name , species , and editing
  const [name, setName] = useState<string>(favorite.name);
  const [species, setSpecies] = useState<string>(favorite.species);
  const [editing, setEditing] = useState<boolean>(false);

  // create favorite state 
  const [fav, setFav] = useState(favorite)

  // create handleSave to update db
  const handleSave = () => {
    console.log("handleSave called with name: ", name, " and species: ", species)
    try {

      onUpdate({...favorite, name, species})
      setEditing(false)
    } catch (e) {
      console.log("handle save error: ", e)
    }
  }

  // create pressable that allows name and species to be changed
  return (
    <View style={styles.container}>
      {/* Character Image */}
      <Image source={{ uri: favorite.image }} style={styles.image} />

      {editing ? (
        <View style={styles.info}>
          {/* Edit name and species */}
          <TextInput value={name} onChangeText={setName} />
          <TextInput value={species} onChangeText={setSpecies} />
        </View>
      ) : (
        <View style={styles.info}>
          {/* Character Info */}
          <Text style={styles.name}>{favorite.name}</Text>
          <Text style={styles.species}>{favorite.species}</Text>
        </View>
      )}

      {/* Edit Button */}
      <Pressable
        // change editing state and save when done editing
        // if in editing mode -> pressing icon should call update funciton , otherwise update editing state
        onPress={editing ? handleSave : () => setEditing(true)}
        style={styles.deleteBtn}
      >
        {/* If im in editing mode -> display save icon , otherwise edit icon */}
        <Ionicons name={editing ? "save-outline" : "create-outline"} size={24} color="red" />
      </Pressable>

      {/* Trash Button */}
      <Pressable
        // update to use onDelete function provided
        onPress={() => onDelete(favorite.id)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  species: {
    fontSize: 14,
    color: "#666",
  },

  deleteBtn: {
    padding: 8,
  },
});
