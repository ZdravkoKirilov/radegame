import { TextStyleOptions , Texture} from "pixi.js";

export type BaseProps = {
    type?: string;
    name?: string;
    children?: BaseProps[];
    template?: string;
    body?: string;
    mapped?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        visible?: boolean;
        rotation?: number;
    },
    hovered?: {},
    image?: Texture;
    text?: string;
    textStyle?: TextStyleOptions;
    [key: string]: any;
};