import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { Character } from '@/interfaces/interfaces';
import { deleteFavFromDb, getFavsFromDb, updateFavInDb } from '@/database/db';
import { useFocusEffect } from 'expo-router';

import { RenderCharacter } from '@/components/RenderCharacter';
import RenderFav from '@/components/RenderFav';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  // Access all characters in favorites table and display them using FlatList
  const [favs, setFavs] = useState<Character [] | []>([]);

  const loadFavorites = async () => {
      const favorites = await getFavsFromDb()
      setFavs(favorites)
    }
  // run every time screen is visbile
  useFocusEffect(() => {
    loadFavorites()
  })

  // create function that deletes char from fav [] and updates db
  const handleOnDelete = async (id: number) => {
    try {
      // remove char with 'id' from db
      // loadcurrent db, to update favs []
      await deleteFavFromDb(id);
      loadFavorites()
    } catch (e) {
      console.log("favorites.tsx - handleOnDelete: ", e)
    }
  }

  // create function that updates favs state after removing item
  // pass this function to the child component so it can update the parent state
  const updateFavsList = async (fav: Character) => {
    try {
      await updateFavInDb(fav)
      loadFavorites()
    } catch (e) {
      console.log("favorites.tsx - updateFavsList: ", e)
    }
  }

  console.log("Favs on favorites page: ", favs)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* display favorite chars using flatlist */}
      <FlatList 
        data={favs}
        renderItem={({item}) => <RenderFav onUpdate={updateFavsList} onDelete={handleOnDelete} favorite={item}/>}
        // keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
