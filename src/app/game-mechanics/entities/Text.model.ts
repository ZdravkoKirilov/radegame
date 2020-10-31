import get from 'lodash/get';
import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged, safeJSON } from '@app/shared';
import { RzStyles } from '@app/render-kit';

import { BaseModel, GameEntityParser, WithStyle } from "./Base.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { enrichEntity, parseAndBind } from '../helpers';
import { toModuleId } from './Module.model';
import { Game, GameLanguage, GameLanguageId, toGameLanguageId } from './Game.model';

export type TextId = Nominal<string, 'TextId'>;
export const toTextId = (source: unknown) => String(source) as TextId;

export type Text = BaseModel<TextId> & WithStyle & Tagged<'Text', {
  default_value: string;
  translations: Translation[];
}>

export type DtoText = Omit<Text, '__tag' | 'id' | 'module' | 'translations'> & {
  id: number;
  module: number;
  translations: DtoTranslation[];
};

export type RuntimeText = Omit<Text, 'style' | 'style_inline'> & {

  style: ParamedExpressionFunc<RuntimeText, Style>;
  style_inline: RzStyles;

  computed_value: string;
};

export const Text: GameEntityParser<Text, DtoText, RuntimeText> & TextOperations = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Text',
      id: toTextId(dto.id),
      module: toModuleId(dto.module),
      translations: dto.translations.map(elem => Translation.toEntity(elem))
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
      translations: entity.translations.map(elem => Translation.toDto(elem))
    };
  },

  toRuntime(context, text, language: GameLanguageId) {
    let runtimeText = enrichEntity<Text, RuntimeText>(context.conf, {
      style_inline: src => safeJSON(src, {}),
      style: src => parseAndBind(context)(src),
    }, text);

    const translation = runtimeText.translations?.find(elem => elem.language === language);
    runtimeText = { ...runtimeText, computed_value: translation?.value || runtimeText.default_value };
    return runtimeText;
  },

  saveTranslation(text, translation) {
    return {
      ...text,
      translations: text.translations.map(elem => elem.id === translation.id ? translation : elem),
    };
  }
};

type TextOperations = {
  saveTranslation: (text: Text, Translation: Translation) => Text;
}

type TranslationId = Nominal<string, 'TranslationId'>;
const toTranslationId = (source: unknown) => String(source) as TranslationId;

export type Translation = Tagged<'Translation', {
  id: TranslationId;
  owner: TextId;

  language: GameLanguageId;
  value: string;
}>;

type DtoTranslation = Omit<Translation, '__tag' | 'id' | 'owner' | 'language'> & {
  id: number;
  owner: number;
  language: number;
};

type RuntimeTranslation = Omit<Translation, 'language'> & {
  language: GameLanguage;
};

const Translation: GameEntityParser<Translation, DtoTranslation, RuntimeTranslation> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Translation',
      id: toTranslationId(dto.id),
      owner: toTextId(dto.owner),
      language: toGameLanguageId(dto.language),
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      owner: Number(entity.owner),
      language: Number(entity.language),
    };
  },

  toRuntime(context, entity, game: Game) {
    return enrichEntity<Translation, RuntimeTranslation>(context.conf, {
      language: id => game.languages.find(lang => lang.id === id)
    }, entity);
  }
};
