import { Category } from "./Category";

export type Subcategory = {
    id: number,
    name: string,
    iconURL: string;
    category: Category;
}

export default Subcategory;