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
import { getFavsFromDb } from '@/database/db';
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

  // create function that updates favs state after removing item
  const updateFavsList = async () => {
    loadFavorites()
  }

  console.log("Favs on favorites page: ", favs)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* display favorite chars using flatlist */}
      <FlatList 
        data={favs}
        renderItem={({item}) => <RenderFav favorite={item}/>}
        keyExtractor={(item) => item.id.toString()}
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
