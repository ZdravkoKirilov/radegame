import { MetaProps } from "./BaseProps";

export type ParseParams = {
    source: string;
    context?: any;
    closure?: {[key: string]: any},
    meta?: MetaProps;
    removePrefix?: boolean;
};