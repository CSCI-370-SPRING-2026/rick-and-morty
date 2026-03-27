import { Image } from 'expo-image';
import { FlatList, Platform, SafeAreaView, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  // Update to fetch characters from the API and store them in state
  // Pass the characters to the FlatList and render them using the RenderCharacter component

  return (
    
    <FlatList
      data={}
      keyExtractor={}
      renderItem={}
    />
    
  );
}

const styles = StyleSheet.create({
  
});
