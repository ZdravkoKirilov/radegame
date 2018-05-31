import { TextStyleOptions , Texture} from "pixi.js";
import { Styles } from "./Styles";

export type BaseProps = {
    type?: string;
    name?: string;
    children?: BaseProps[];
    template?: string;
    body?: string;
    mapped?: Styles,
    styles?: Set<Styles>;
    image?: Texture;
    value?: string;
    textStyle?: TextStyleOptions;
    [key: string]: any;
};