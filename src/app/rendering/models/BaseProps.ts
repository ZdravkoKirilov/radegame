import { TextStyleOptions , Texture, loaders} from "pixi.js";
import { Styles } from "./Styles";

export type BaseProps = {
    type?: string;
    name?: string;
    children?: BaseProps[];
    template?: string;
    body?: string;
    mapped?: Partial<Styles>,
    imageSrc?: string;
    image?: Texture;
    value?: string;
    textStyle?: TextStyleOptions;
    [key: string]: any;
};

export type MetaProps = {
    textures: any;
};