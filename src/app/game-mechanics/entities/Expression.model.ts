export type Expression = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    preload_as: string;
    code: string;
}>