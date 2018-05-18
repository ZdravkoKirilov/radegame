import { TextStyleOptions , Texture} from "pixi.js";

export type BaseElement = {
    type?: string;
    name: string;
    children?: BaseElement[];
    template?: string;
    body?: string;
    mapped: {
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