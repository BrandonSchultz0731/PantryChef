import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { PantryItem } from "@/types/pantryItem";
import {
  clearPantry,
  createPantryTable,
  deletePantryItem,
  dropPantry,
  getDBConnection,
  getPantry,
  insertPantryItem,
  updatePantryItem,
} from "@/utils/Database";
import { useEffect, useState } from "react";

export const usePantry = () => {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const handleInsertPantryItem = async (pantryItem: Omit<PantryItem, "id">) => {
    const db = await getDBConnection();
    await insertPantryItem(db, pantryItem);
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
    await handleGetPantry();
  };

  const handleGetPantry = async () => {
    const db = await getDBConnection();
    const pantryItem: PantryItem[] = await getPantry(db);
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

  const handleDropPantry = async () => {
    const db = await getDBConnection();
    await dropPantry(db);
  };

  useEffect(() => {
    const getDb = async () => {
      const db = await getDBConnection();
      createPantryTable(db);
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
    handleDropPantry,
  };
};
