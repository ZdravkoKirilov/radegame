export interface AbstractLoader {
    loadAll(resources: Set<string>): Promise<LoaderResources>;
    loadOne(url: string): Promise<LoaderResource>;
}

export type LoaderResources = {
    [key: string]: LoaderResource;
};

export type LoaderResource = {
    texture: any;
}