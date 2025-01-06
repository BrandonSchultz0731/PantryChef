import { MEASUREMENT_UNITS } from "@/constants/measurements";

export type PantryItem = {
  id: number;
  name: string;
  quantity: number;
  unit: MEASUREMENT_UNITS;
};
