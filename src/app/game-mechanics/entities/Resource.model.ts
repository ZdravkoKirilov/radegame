export interface Resource {
    id?: number;
    name?: string;
    image?: string;
    game?: number;
    description?: string;
    keywords?: string;
}

export interface ResourceList {
    [key: string]: Resource;
}
