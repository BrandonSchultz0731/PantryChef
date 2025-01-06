import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { PantryItem } from "@/types/pantryItem";
import {
  createTable,
  getDBConnection,
  getPantry,
  insertPantryItem,
} from "@/utils/Database";
import { useEffect, useState } from "react";

export const usePantry = () => {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const handleInsertPantryItem = async (
    name: string,
    quantity: number,
    unit: MEASUREMENT_UNITS,
  ) => {
    const db = await getDBConnection();
    await insertPantryItem(db, name, quantity, unit);
    console.log("Pantry Item inserted");
    await handleGetPantry();
  };

  const handleGetPantry = async () => {
    const db = await getDBConnection();
    const pantryItem: PantryItem[] = await getPantry(db);
    console.log("Pantry items:", pantryItem);
    setPantry(pantryItem); // Set the fetched data to the state
  };

  useEffect(() => {
    const getDb = async () => {
      console.log("GETTING CONNECTION");
      const db = await getDBConnection();
      console.log("CREATING TABLE");
      createTable(db);
      console.log("DONE!!!");
      await handleGetPantry();
    };
    getDb();
  }, []);

  return {
    pantry,
    handleInsertPantryItem,
  };
};
