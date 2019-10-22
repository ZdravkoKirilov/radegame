export type ImageAsset = Partial<{
    id: number;
    game: number;

    name: string;
    image: string;
    thumbnail: string;
    svg: string;
}>

export type ImageFrame = Partial<{
    id: number;
    owner: number;

    image: number;
    style: number;
}>