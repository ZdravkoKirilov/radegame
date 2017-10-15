export interface Resource {
    id?: number;
    name?: string;
    image?: string;
    plural?: string;
    description?: string;
}

export interface ResourceList {
    [key: string]: Resource;
}
