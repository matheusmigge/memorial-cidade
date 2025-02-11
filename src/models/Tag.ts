import { Category } from "./Category";

export type Tag = {
    id: number;
    name: string;
    iconURL: string;
    category: Category;
}