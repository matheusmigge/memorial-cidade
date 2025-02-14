import { Subcategory } from "./Subcategory";

export type Category = {
    id: number;
    name: string;
    iconURL: string;
    subcategoryIds?: number[];
}