import { MEASUREMENT_UNITS } from "@/constants/measurements";
import { CookbookIngredients, CookbookItem } from "@/types/cookbookItem";
import {
  createCoookbookTable,
  dropCookbook,
  getCookbook,
  getDBConnection,
  insertCookbookItem,
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
    console.log("Cookbook Item inserted");
    await handleGetCookbook();
  };

  const handleGetCookbook = async () => {
    const db = await getDBConnection();
    const cookbookItem: CookbookItem[] = await getCookbook(db);
    console.log("Cookbook items:", cookbookItem);
    setCookbook(cookbookItem); // Set the fetched data to the state
  };

  const handleDropCookbook = async () => {
    const db = await getDBConnection();
    await dropCookbook(db);
  };

  useEffect(() => {
    const getDb = async () => {
      console.log("GETTING CONNECTION");
      const db = await getDBConnection();
      console.log("CREATING TABLE");
      createCoookbookTable(db);
      console.log("DONE!!!");
      await handleGetCookbook();
    };
    getDb();
  }, []);

  return {
    cookbook,
    handleInsertCookbookItem,
    handleDropCookbook,
  };
};
