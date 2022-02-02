export interface Document{
    DocumentId: number,
    Title: string,
    ContentType: string,
    Category: number,
}

export interface Tag{
    data: any[];
    TagName: string,
    isActive: boolean;
    id: number;
}