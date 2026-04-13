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
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
            );


        `);
  } catch (e) {
    console.log("Error: ", e);
  }
};

// add character to characters to table
export const addCharToDb = async (char: Character) => {
  try {
    await db.runAsync(
      `INSERT OR IGNORE INTO characters (id, name, image, species)
            VALUES (?, ?, ?, ?)`,
      [char.id, char.name, char.image, char.species],
    );
  } catch (e) {
    console.log("addCharToDb: ", e);
  }
};

// get all characters from characters table
export const getCharsFromDb = async (): Promise<Character[]> => {
  try {
    const result = await db.getAllAsync<Character>(
      `SELECT id, name, image, species FROM characters`,
    );
    return result;
  } catch (e) {
    console.log("getCharsFromDb: ", e);
    return [];
  }
};

// Create and export function that adds a character to the favorites table
export const addFavToDb = async (id: number) => {
  // try to add char to favorites
  try {
    await db.runAsync(
      `INSERT INTO favorites (character_id)
            VALUES (?)`,
      [id],
    );
  } catch (e) {
    console.log("addFavToDb: ", e);
  }
};

// Create and export function that reads and returns all data from the favorites table
export const getFavsFromDb = async (): Promise<Character[]> => {
  try {
    // get results from db
    const result = await db.getAllAsync<Character>(
      `SELECT 
        c.id, c.name, c.image, c.species
      FROM 
        favorites f
      JOIN 
        characters c ON f.character_id = c.id
      ORDER BY 
        f.created_at DESC`,
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
export const updateFavInDb = async (fav: Character) => {
  try {
    await db.runAsync(
      `UPDATE characters
        SET name = ?, species = ?, image = ?
        WHERE id = ?`,
      [fav.name, fav.species, fav.image, fav.id],
    );
  } catch (e) {
    console.log("DB updateFavInDb: ", e);
  }
};

export const resetDatabaseSchema = async () => {
  await db.execAsync(`
PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS characters;
PRAGMA foreign_keys = ON;
`);
  await initDatabase();
};
