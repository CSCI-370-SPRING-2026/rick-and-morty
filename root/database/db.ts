/* 
Create and export database
Create and export function to initialize favorites table inside database
    Each favorites item should consist of the following properities: 
        id (INTEGER), name (TEXT), image (TEXT), specs(TEXT)

Create and export function that adds a character to the favorites table

Create and export function that removes a character from the favorites table

Create and export function that reads and returns all data from the favorites table 
*/
import { Character } from "@/interfaces/interfaces";
import * as SQLite from "expo-sqlite";

// Create DB and export
export const db = SQLite.openDatabaseSync("favorites.db");

//Create and export function to initialize favorites table inside database
// Each favorites item should consist of the following properities:
// id (INTEGER), name (TEXT), image (TEXT), species(TEXT)
export const initDatabase = async () => {
  try {
    // from the db we just created, use execAsync to create new table
    await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;
            
            CREATE TABLE IF NOT EXISTS characters (
                id INTEGER PRIMARY KEY UNIQUE,
                name TEXT,
                image TEXT,
                species TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS favorites (
                character_id INTEGER PRIMARY KEY UNIQUE,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
            );
        `);
  } catch (e) {
    console.log("Error: ", e);
  }
};

// Create and export function that adds a character to the favorites table
export const addCharToDb = async (character: Character) => {
  // try to add char to favorites
  try {
    await db.runAsync(
      `INSERT INTO characters (id, name, image, species)
            VALUES (?, ?, ?, ?)`,
      [character.id, character.name, character.image, character.species],
    );
  } catch (e) {
    console.log("addFavToDb: ", e);
  }
};

// add char to favs database
export const addFavToDb = async (id: number) => {
  try {
    await db.runAsync(
      `INSERT INTO favorites (character_id)
      VALUES (?)`,
      [id],
    );
  } catch (e) {
    console.log("addFavToDb Error: ", e);
  }
};

// Create and export function that reads and returns all data from the favorites table
export const getCharsFromDb = async (): Promise<Character[]> => {
  try {
    // get results from db
    const result = await db.getAllAsync<Character>(
      `SELECT * FROM characters
            ORDER BY created_at DESC`,
    );
    return result;
  } catch (e) {
    console.log("getFavsFromDb: ", e);
    return [];
  }
};

// Delete character from database
export const deleteFavFromDb = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM favorites WHERE character_id = ?`, [id]);
  } catch (e) {
    console.log("deleteFavFromDb Error: ", e);
  }
};

// check if char is in database or not -> return true if char is in db, false otherwise
export const isFavoritedInDb = async (id: number) => {
  try {
    // if it exists in db , result should be 1, other wise 0
    // get results from db
    // EXISTS will return 1 or 0
    const result = await db.getFirstAsync<{ favorited: number }>(
      `
        SELECT EXISTS(SELECT 1 FROM favorites WHERE character_id = ?) 
        AS favorited`,
      [id],
    );
    // return true if result is 1
    // return false otherwise
    return result?.favorited === 1;
  } catch (e) {
    console.log("isFavoritedInDb: ", e);
  }
};

// Create function to update element in db
// provide entire char we want to update
export const updateCharacter = async (fav: Character) => {
  try {
    await db.runAsync(
      `UPDATE characters
        SET name = ?, species = ?, image = ?
        WHERE id = ?`,
      [fav.name, fav.species, fav.image, fav.id],
    );
  } catch (e) {
    console.log("DB updateCharacter: ", e);
  }
};

// get all items from favorites table
export const getFavorites = async ():  Promise<Character[]> => {
  try {
  return await db.getAllAsync(`
      SELECT
       c.id,
       c.name,
       c.species,
       c.image,
       c.created_at
       FROM favorites f
       JOIN characters c
       ON f.character_id = c.id
    `);
  } catch (e){
    console.log("getFavorites Error: ", e)
    return []
  }
};

// Create and export function that resets the database schema (for testing purposes)
export const resetDatabaseSchema = async () => {
  await db.execAsync(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS characters;
    PRAGMA foreign_keys = ON;
`);
  await initDatabase();
};
