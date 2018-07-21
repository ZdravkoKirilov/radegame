import { Styles } from "./Styles";
import { PrimitiveType } from "../config";
import { StatefulComponent } from "../mixins";

export interface RzElement {
    type: RzElementType;
    props: RzElementProps,
    children: RzElement[];
};

type StrictRzElementProps = {
    [key: string]: any;
    type: PrimitiveType;
    styles: Partial<Styles>;
    key: number | string;
    children: RzElement[];
};

export type RzElementProps = Partial<StrictRzElementProps>;

export type RenderFunction<T> = (props: T) => RzElement;

export type RzElementType = PrimitiveType | typeof StatefulComponent | RenderFunction<any>;
