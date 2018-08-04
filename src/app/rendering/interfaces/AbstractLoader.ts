export interface AbstractLoader {
    loadAll(resources: Set<string>): Promise<LoaderResources>;
}

export type LoaderResources = {
    [key: string]: {
        texture: any;
    }
};