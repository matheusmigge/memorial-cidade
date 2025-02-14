export type Photo = {
    id: number;
    viewCategoryId: number;
    url: string;
    yearStart: number;
    yearEnd?: number | null;
    title?: string | null;
    author?: string | null;
    sourceCollection?: string | null;
    sourceReference?: string | null;
    sourceLink?: string | null;
    tagIds: number[];
    coordinates: [number, number]
    compassDirection: number;
    contributorName: string;
    contributorComment: string;
    publicationDate: Date;
}