import { Character } from "@/interfaces/interfaces";
import React from "react";
import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteFavFromDb } from "@/database/db";

export default function RenderFav({ favorite}: { favorite: Character}) {
  return (
    <View style={styles.container}>
      
      {/* Character Image */}
      <Image source={{ uri: favorite.image }} style={styles.image} />

      {/* Character Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{favorite.name}</Text>
        <Text style={styles.species}>{favorite.species}</Text>
      </View>

      {/* Trash Button */}
      <Pressable
        onPress={() => deleteFavFromDb(favorite.id)}
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