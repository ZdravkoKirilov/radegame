export interface AbstractLoader {
    loadAll(resources: Array<string>): Promise<LoaderResources>;
}

export type LoaderResources = {
    [key: string]: {
        texture: any;
    }
};