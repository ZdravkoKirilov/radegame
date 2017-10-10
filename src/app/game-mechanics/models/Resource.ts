export interface Resource {
    id: number;
    name: string;
    quantity: number;
}

export interface ResourceList {
    [key: string]: Resource;
}
