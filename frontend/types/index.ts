export enum SnippetType {
    LINK = "link",
    NOTE = "note",
    COMMAND = "command",
}

export interface ISnippet {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
}

export interface CreateSnippetDto {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}