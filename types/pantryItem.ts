import { MEASUREMENT_UNITS } from "@/constants/measurements";

export type PantryItem = {
  id: number;
  spoontacularId: number;
  spoontacularName: string;
  name: string;
  quantity: number;
  unit: MEASUREMENT_UNITS;
};
