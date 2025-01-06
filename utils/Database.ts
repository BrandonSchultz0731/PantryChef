import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { PantryItem } from "@/types/pantryItem";
import * as SQLite from "expo-sqlite";

const databaseName = "PantryChefDB";

const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  return db;
};

export interface PantrySchema {
  id: number;
  name: string;
  quantity: number;
  unit: MEASUREMENT_UNITS;
}

const createTable = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  console.log("DB: ", db);
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS pantry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantity INTEGER,
        unit TEXT
      );
    `;
    await db.execAsync(query);
  } catch (err) {
    console.log("ERR: ", err);
  }
};

const insertPantryItem = async (
  db: SQLite.SQLiteDatabase,
  name: string,
  quantity: number,
  unit: MEASUREMENT_UNITS,
): Promise<void> => {
  const query = "INSERT INTO pantry (name, quantity, unit) VALUES (?, ?, ?)";
  await db.runAsync(query, name, quantity, unit);
};

const getPantry = async (db: SQLite.SQLiteDatabase): Promise<PantryItem[]> => {
  const query = "SELECT * FROM pantry";
  const result: PantryItem[] = await db.getAllAsync(query);
  return result;
};

export { getDBConnection, createTable, insertPantryItem, getPantry };
