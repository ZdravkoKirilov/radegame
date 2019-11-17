import { Stage } from "./Stage.model";
import { WithStyle } from "./Base.model";

export type ImageAsset = Partial<{
    id: number;
    game: number;

    name: string;
    image: string;
    thumbnail: string;
    svg: string;
}>

export type ImageFrame = WithStyle & Partial<{
    id: number;
    owner: number;

    image: ImageAsset;
    stage: Stage;
}>