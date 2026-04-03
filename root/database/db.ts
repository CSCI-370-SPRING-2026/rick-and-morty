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
            
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY,
                name TEXT,
                image TEXT,
                species TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `);
  } catch (e) {
    console.log("Error: ", e);
  }
};

// Create and export function that adds a character to the favorites table
export const addFavToDb = async (character: Character) => {
    // try to add char to favorites
    try {
        await db.runAsync(
            `INSERT INTO favorites (id, name, image, species)
            VALUES (?, ?, ?, ?)`,
            [character.id, character.name, character.image, character.species]
        );
    } catch (e) {
        console.log("addFavToDb: ", e)
    }
};

// Create and export function that reads and returns all data from the favorites table 
export const getFavsFromDb = async (): Promise<Character []> => {
    try {
        // get results from db
        const result = await db.getAllAsync<Character>(
            `SELECT * FROM favorites
            ORDER BY created_at DESC`
        );
        return result
    } catch (e) {
        console.log("getFavsFromDb: ", e)
        return []
    }
}