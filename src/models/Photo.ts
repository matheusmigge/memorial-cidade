import { Category } from "./Category";
import { Tag } from "./Tag";

export type Photo = {
    id: number;
    shootingCategory: Category;
    url: string;
    yearStart: number;
    yearEnd?: number | null;
    title?: string | null;
    author?: string | null;
    sourceCollection?: string | null;
    sourceReference?: string | null;
    sourceLink?: string | null;
    tags: Tag[];
    coordinates: [number, number]
    compassDirection: number;
    contributorName: string;
    contributorComment: string;
    publicationDate: Date;
}