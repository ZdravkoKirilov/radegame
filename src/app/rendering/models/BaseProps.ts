import { TextStyleOptions, Texture, loaders } from "pixi.js";
import { Styles } from "./Styles";
import { Component } from "../interfaces";

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
    points?: Points;
    [key: string]: any;
};

export type MetaProps = {
    textures: any;
    containers: {
        [key: string]: Component
    };
};

export type Points = Array<Array<number>>;

