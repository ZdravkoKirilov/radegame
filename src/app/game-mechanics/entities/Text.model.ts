import { BaseModel, WithStyle } from "./Base.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { Omit } from '@app/shared';

export type Text = BaseModel & WithStyle & Partial<{
    default_value: string;
    translations: Translation[];
}>

export type RuntimeText = Omit<Text, 'style' | 'style_inline'> & {
    style: ParamedExpressionFunc<RuntimeText, Style>;
    style_inline: Style;

    computed_value: string;
};

export type Translation = Partial<{
    id: number;
    owner: number;

    language: number; // GameLanguage;
    value: string;
}>