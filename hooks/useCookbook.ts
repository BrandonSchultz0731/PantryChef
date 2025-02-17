import { CookbookIngredients, CookbookItem } from "@/types/cookbookItem";
import {
  createCoookbookTable,
  deleteCookbookItem,
  dropCookbook,
  getCookbook,
  getDBConnection,
  insertCookbookItem,
  updateCookbookItem,
} from "@/utils/Database";
import { useEffect, useState } from "react";

export const useCookbook = () => {
  const [cookbook, setCookbook] = useState<CookbookItem[]>([]);
  const handleInsertCookbookItem = async (
    recipeName: string,
    ingredients: CookbookIngredients,
    prep_time: number,
    cook_time: number,
    instructions: string,
  ) => {
    const db = await getDBConnection();
    await insertCookbookItem(
      db,
      recipeName,
      ingredients,
      prep_time,
      cook_time,
      instructions,
    );
    await handleGetCookbook();
  };

  const handleUpdateCookbookItem = async (
    id: number,
    recipeName: string,
    ingredients: CookbookIngredients,
    prep_time: number,
    cook_time: number,
    instructions: string,
  ) => {
    const db = await getDBConnection();
    await updateCookbookItem(
      db,
      id,
      recipeName,
      ingredients,
      prep_time,
      cook_time,
      instructions,
    );
    await handleGetCookbook();
  };

  const handleGetCookbook = async () => {
    const db = await getDBConnection();
    const cookbookItem: CookbookItem[] = await getCookbook(db);
    setCookbook(cookbookItem); // Set the fetched data to the state
  };

  const handleDropCookbook = async () => {
    const db = await getDBConnection();
    await dropCookbook(db);
  };

  const handleDeleteCookbookItem = async (id: number) => {
    const db = await getDBConnection();
    await deleteCookbookItem(db, id);
    await handleGetCookbook();
  };

  useEffect(() => {
    const getDb = async () => {
      const db = await getDBConnection();
      createCoookbookTable(db);
      await handleGetCookbook();
    };
    getDb();
  }, []);

  return {
    cookbook,
    handleInsertCookbookItem,
    handleDropCookbook,
    handleDeleteCookbookItem,
    handleUpdateCookbookItem,
  };
};
