import get from 'lodash/get';
import { Nominal } from 'simplytyped';

import { Omit, safeJSON } from '@app/shared';

import { BaseModel, WithStyle, WithRuntimeStyle } from "./Base.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { enrichEntity, parseAndBind } from '../helpers';
import { ExpressionContext } from '../models';

export type TextId = Nominal<string, 'TextId'>;

export type Text = BaseModel<TextId> & WithStyle & Partial<{
  default_value: string;
  translations: Translation[];
}>

export const Text = {

  toRuntime(context: ExpressionContext, text: Text, language?: number) {
    let runtimeText = enrichEntity<Text, RuntimeText>(context.conf, {
      style_inline: src => safeJSON(src, {}),
      style: src => parseAndBind(context)(src),
    }, text);

    const translation = (runtimeText.translations || []).find(elem => elem.language === language);
    runtimeText = { ...runtimeText, computed_value: get(translation, 'value', runtimeText.default_value) };
    return runtimeText;
  }
};

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
}>;

export type TextFrame = WithStyle & {
  id: number;
  owner: number;
  name: string;

  text: number;
};

export type RuntimeTextFrame = Omit<TextFrame, 'text' | 'style' | 'style_inline'> & WithRuntimeStyle & {
  text: Text;
};