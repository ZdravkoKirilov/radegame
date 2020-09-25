import { Nominal } from 'simplytyped';

import { Omit, Dictionary } from '@app/shared';
import { LobbyPlayer } from '@app/game-arena';

import {
  WithImage, Module, ExpressionFunc, WithBoard, Token, Expression, Sonata, Sound,
  Widget, Text, Setup, ImageAsset, Sandbox, Shape, Style, Version, Animation
} from '../entities';
import { ExpressionContext } from './ExpressionContext.model';
import { enrichEntity, parseAndBind } from '../helpers';

export type GameId = Nominal<string, 'GameId'>;
export const toGameId = (source: unknown) => String(source) as GameId;

export type Game = WithBoard & Partial<{
  id: GameId;

  title: string;
  description: string;
  image: string;

  core_data: string;

  languages: GameLanguage[];
  menu: number;
  get_active_module: string;
}>

export const Game = {
  toRuntime(context: ExpressionContext, game: Game) {
    if (game) {
      return enrichEntity<Game, RuntimeGame>(context.conf, {
        menu: 'modules',
        get_active_module: src => parseAndBind(context)(src),
      }, game);
    }
    return null;
  }
}

export type RuntimeGame = Omit<Game, 'menu' | 'get_active_module'> & {
  menu: Module;
  get_active_module: ExpressionFunc<string>;
}

export type GameLanguage = WithImage & Partial<{
  id: number;
  owner: number; // Game
  name: string;
  display_name: string;
}>

// export type GameTemplate = Omit<WithKeysAs<typeof ALL_ENTITIES, GameEntityList>, 'games'>;

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
}

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