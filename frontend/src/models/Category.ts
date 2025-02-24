import { Subcategory } from "./Subcategory";

export type Category = {
    id: number;
    name: string;
    iconURL: string;
    subcategorys?: Subcategory[] | null;
}

export default Category;