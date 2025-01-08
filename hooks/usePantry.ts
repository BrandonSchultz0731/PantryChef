import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { PantryItem } from "@/types/pantryItem";
import {
  clearPantry,
  createPantryTable,
  deletePantryItem,
  getDBConnection,
  getPantry,
  insertPantryItem,
  updatePantryItem,
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

  const handleUpdatePantryItem = async (
    id: number,
    name: string,
    quantity: number,
    unit: MEASUREMENT_UNITS,
  ) => {
    const db = await getDBConnection();
    await updatePantryItem(db, id, name, quantity, unit);
    console.log("Pantry Item inserted");
    await handleGetPantry();
  };

  const handleGetPantry = async () => {
    const db = await getDBConnection();
    const pantryItem: PantryItem[] = await getPantry(db);
    console.log("Pantry items:", pantryItem);
    setPantry(pantryItem); // Set the fetched data to the state
  };

  const handleClearPantry = async () => {
    const db = await getDBConnection();
    await clearPantry(db);
    await handleGetPantry();
  };

  const handleDeletePantryItem = async (id: number) => {
    const db = await getDBConnection();
    await deletePantryItem(db, id);
    await handleGetPantry();
  };

  useEffect(() => {
    const getDb = async () => {
      console.log("GETTING CONNECTION");
      const db = await getDBConnection();
      console.log("CREATING TABLE");
      createPantryTable(db);
      console.log("DONE!!!");
      await handleGetPantry();
    };
    getDb();
  }, []);

  return {
    pantry,
    handleInsertPantryItem,
    handleClearPantry,
    handleUpdatePantryItem,
    handleDeletePantryItem,
  };
};
