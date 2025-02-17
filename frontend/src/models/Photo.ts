import { Decade } from "./Decade";
import { Subcategory } from "./Subcategory";
import { Tag } from "./Tag";

export type Photo = {
    id: number;
    viewSubcategory: Subcategory;
    decades: Decade[];
    url: string;
    yearStart: number;
    yearEnd?: number | null;
    title: string;
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

export default Photo;