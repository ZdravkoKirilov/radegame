import { Nominal } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Omit, Dictionary, Tagged } from '@app/shared';
import { LobbyPlayer } from '@app/game-arena';

import {
  Module, ExpressionFunc, WithBoard, Token, Expression, Sonata, Sound,
  Widget, Text, Setup, ImageAsset, Sandbox, Shape, Style, Version, Animation, ImageAssetId, GameEntityParser, ModuleId, toImageId, toModuleId
} from '../entities';
import { enrichEntity, parseAndBind } from '../helpers';

export type GameId = Nominal<string, 'GameId'>;
export const toGameId = (source: unknown) => String(source) as GameId;

export type Game = Tagged<'Game', WithBoard & {
  id: GameId;

  title: string;
  description: string;
  image: string;

  languages: GameLanguage[];
  menu: ModuleId;
  get_active_module: string;
}>;

export type DtoGame = Omit<Game, '__tag' | 'id' | 'languages' | 'menu'> & {
  id: number;
  menu: number;
  languages: DtoGameLanguage[];
};

export const Game: GameEntityParser<Game, DtoGame, RuntimeGame> = {
  toRuntime(context, game) {
    return enrichEntity<Game, RuntimeGame>(context.conf, {
      menu: 'modules',
      get_active_module: src => parseAndBind(context)(src),
    }, game);
  },

  toDto(game) {
    return {
      ...omit('__tag', game),
      id: Number(game.id),
      menu: Number(game.menu),
      languages: game.languages.map(elem => GameLanguage.toDto(elem)),
    }
  },

  toEntity(gameDto) {
    return {
      ...gameDto,
      __tag: 'Game',
      id: toGameId(gameDto.id),
      menu: toModuleId(gameDto.menu),
      languages: gameDto.languages.map(elem => GameLanguage.toEntity(elem))
    }
  }

}

export type RuntimeGame = Omit<Game, 'menu' | 'get_active_module'> & {
  menu: Module;
  get_active_module: ExpressionFunc<string>;
};

const GameLanguage: GameEntityParser<GameLanguage, DtoGameLanguage, RuntimeGameLanguage> = {
  toDto(language) {
    return {
      ...omit('__tag', language),
      id: Number(language.id),
      owner: Number(language.owner),
      image: Number(language.image),
    };
  },
  toEntity(dtoLanguage) {
    return {
      ...dtoLanguage,
      __tag: 'GameLanguage',
      id: toGameLanguageId(dtoLanguage.id),
      owner: toGameId(dtoLanguage.owner),
      image: toImageId(dtoLanguage.image),
    }
  },

  toRuntime(context, language) {
    return enrichEntity<GameLanguage, RuntimeGameLanguage>(context.conf, {
      image: 'images',
    }, language);
  }
};

export type GameLanguageId = Nominal<string, 'GameLanguageId'>;
const toGameLanguageId = (source: unknown) => String(source) as GameLanguageId;

export type GameLanguage = Tagged<'GameLanguage', {
  id: GameLanguageId;
  owner: GameId;
  name: string;
  display_name?: string;
  image?: ImageAssetId;
}>;

export type RuntimeGameLanguage = Omit<GameLanguage, 'image'> & {
  image?: ImageAsset;
};

export type DtoGameLanguage = Omit<GameLanguage, '__tag' | 'id' | 'owner' | 'image'> & {
  id: number;
  owner: number;
  image: number;
};

export type GameTemplate = {
  tokens: Dictionary<Token>;
  expressions: Dictionary<Expression>;
  sonatas: Dictionary<Sonata>;
  sounds: Dictionary<Sound>;
  widgets: Dictionary<Widget>;
  texts: Dictionary<Text>;
  modules: Dictionary<Module>;
  setups: Dictionary<Setup>;
  images: Dictionary<ImageAsset>;
  sandboxes: Dictionary<Sandbox>;
  shapes: Dictionary<Shape>;
  styles: Dictionary<Style>;
  versions: Dictionary<Version>;
  animations: Dictionary<Animation>;
};

export type GameState = {
  setup: number;
  module: number; //
};

export type CreateGamePayload = {
  game_id: number;
  players: LobbyPlayer[];
  lobby_name: string;
  setup: number;
};