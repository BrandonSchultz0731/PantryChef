import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { CookbookIngredients, CookbookItem } from "@/types/cookbookItem";
import { PantryItem } from "@/types/pantryItem";
import * as SQLite from "expo-sqlite";

const databaseName = "PantryChefDB";

const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  console.log("DB", db);
  return db;
};

export interface PantrySchema {
  id: number;
  name: string;
  quantity: number;
  unit: MEASUREMENT_UNITS;
}

const createPantryTable = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  try {
    const pantryQuery = `
      CREATE TABLE IF NOT EXISTS pantry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        spoontacularId INTEGER,
        spoontacularName TEXT,
        name TEXT,
        quantity INTEGER,
        unit TEXT
      );
    `;
    await db.execAsync(pantryQuery);
  } catch (err) {
    console.log("ERR: ", err);
  }
};
const createCoookbookTable = async (
  db: SQLite.SQLiteDatabase,
): Promise<void> => {
  try {
    const cookbookQuery = `
      CREATE TABLE IF NOT EXISTS cookbook (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_name TEXT,
        ingredients JSON NOT NULL,
        prep_time INTEGER,
        cook_time INTEGER,
        instructions TEXT
      );
    `;
    await db.execAsync(cookbookQuery);
  } catch (err) {
    console.log("ERR: ", err);
  }
};

const insertPantryItem = async (
  db: SQLite.SQLiteDatabase,
  pantryItem: Omit<PantryItem, "id">,
): Promise<void> => {
  const query =
    "INSERT INTO pantry (name, quantity, unit, spoontacularId, spoontacularName) VALUES (?, ?, ?, ?, ?)";
  await db.runAsync(
    query,
    pantryItem.name,
    pantryItem.quantity,
    pantryItem.unit,
    pantryItem.spoontacularId,
    pantryItem.spoontacularName,
  );
};
const insertCookbookItem = async (
  db: SQLite.SQLiteDatabase,
  recipeName: string,
  ingredients: CookbookIngredients,
  prep_time: number,
  cook_time: number,
  instructions: string,
): Promise<void> => {
  const query =
    "INSERT INTO cookbook (recipe_name, ingredients, prep_time, cook_time, instructions) VALUES (?, ?, ?, ?, ?)";
  const ingredientsString = JSON.stringify(ingredients);
  await db.runAsync(
    query,
    recipeName,
    ingredientsString,
    prep_time,
    cook_time,
    instructions,
  );
};

const updatePantryItem = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  name: string,
  quantity: number,
  unit: MEASUREMENT_UNITS,
): Promise<void> => {
  const query =
    "UPDATE pantry SET name = ?, quantity = ?, unit = ? WHERE id = ?";
  await db.runAsync(query, name, quantity, unit, id);
};

const updateCookbookItem = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  recipeName: string,
  ingredients: CookbookIngredients,
  prep_time: number,
  cook_time: number,
  instructions: string,
): Promise<void> => {
  const query =
    "UPDATE cookbook SET recipe_name = ?, ingredients = ?, prep_time = ?, cook_time = ?, instructions = ? WHERE id = ?";
  const ingredientsString = JSON.stringify(ingredients);
  await db.runAsync(
    query,
    recipeName,
    ingredientsString,
    prep_time,
    cook_time,
    instructions,
    id,
  );
};

const getPantry = async (db: SQLite.SQLiteDatabase): Promise<PantryItem[]> => {
  const query = "SELECT * FROM pantry";
  const result: PantryItem[] = await db.getAllAsync(query);
  return result;
};

const getCookbook = async (
  db: SQLite.SQLiteDatabase,
): Promise<CookbookItem[]> => {
  const query = "SELECT * FROM cookbook";
  const result: CookbookItem[] = await db.getAllAsync(query);
  return result;
};

const clearPantry = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  try {
    const query = "DELETE FROM pantry";
    await db.execAsync(query);
  } catch (err) {
    console.log("Error clearing pantry:", err);
  }
};

const deleteCookbookItem = async (
  db: SQLite.SQLiteDatabase,
  id: number,
): Promise<void> => {
  try {
    const query = "DELETE FROM cookbook WHERE id = ?";
    await db.runAsync(query, id);
  } catch (err) {
    console.error(`Error deleting recipe with ID ${id}:`, err);
  }
};

const deletePantryItem = async (
  db: SQLite.SQLiteDatabase,
  id: number,
): Promise<void> => {
  try {
    const query = "DELETE FROM pantry WHERE id = ?";
    await db.runAsync(query, id);
  } catch (err) {
    console.error(`Error deleting pantry with ID ${id}:`, err);
  }
};

const dropCookbook = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  try {
    const query = "DROP TABLE cookbook";
    await db.execAsync(query);
  } catch (err) {
    console.log("Error dropping cookbook", err);
  }
};

const dropPantry = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  try {
    const query = "DROP TABLE pantry";
    await db.execAsync(query);
  } catch (err) {
    console.log("Error dropping cookbook", err);
  }
};

export {
  getDBConnection,
  createCoookbookTable,
  createPantryTable,
  insertPantryItem,
  insertCookbookItem,
  getPantry,
  getCookbook,
  clearPantry,
  updatePantryItem,
  updateCookbookItem,
  dropCookbook,
  deleteCookbookItem,
  deletePantryItem,
  dropPantry,
};
