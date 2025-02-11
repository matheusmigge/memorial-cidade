export type Category = {
    id: number,
    name: string,
    iconURL: string,
    subcategory: Category;
}