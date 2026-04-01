// Create and export three functions that get favorites, update favorites, and toggle favorites using AsyncStorage.
// Use the FAVORITES_KEY constant as the key for AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Character } from "@/interfaces/interfaces";
import { FAVORITES_KEY } from "@/keys/keys";

export const getFavorites = async () => {
    try{
        const favs =  await AsyncStorage.getItem(FAVORITES_KEY)
        if (favs){
            return JSON.parse(favs) as Character[]
        } else{
            return []
        }
    } catch (e) {
        console.log(e)
    }
    
};

export const updateFavorites = async (favorites: Character[]) => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (e) {
        console.log(e)
    }
};

export const toggleFavorite = async (favorite: Character) => {
    console.log("Toggling favorite:", favorite)
    try {
        const favs = await AsyncStorage.getItem(FAVORITES_KEY)
        let favorites: Character[] = favs ? JSON.parse(favs) : []

        if (await checkFavorite(favorite)) {
            favorites = favorites.filter((c) => c.id !== favorite.id)
        } else {
            favorites.push(favorite)
        }
        
        await updateFavorites(favorites)
    } catch (e) {
        console.log(e)
    }
};

export const checkFavorite = async (character: Character) => {
    try {
        const favs = await AsyncStorage.getItem(FAVORITES_KEY)
        if (favs){
            const favChars = JSON.parse(favs) as Character []
            return favChars.some((c) => c.id === character.id)
        } else {
            return false
        } 
    } catch (e){
        console.log(e)
    }
}
