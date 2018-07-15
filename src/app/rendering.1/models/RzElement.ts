import { Styles } from "./Styles";
import { CompositeComponent } from "../interfaces";
import { PrimitiveType } from "../config";

export interface RzElement {
    type: RzElementType;
    props: Partial<RzElementProps>,
    children: RzElement[];
};

type StrictRzElementProps = {
    [key: string]: any;
    styles: Styles;
    key: number | string;
};

export type RzElementProps = Partial<StrictRzElementProps>;

export type RzElementType = PrimitiveType | CompositeComponent;