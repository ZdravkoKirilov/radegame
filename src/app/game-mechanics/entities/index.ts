export * from './Action.model';
export * from './Condition.model';
export * from './Round.model';
export * from './Choice.model';
export * from './Stage.model';
export * from './Faction.model';
export * from './Token.model';
export * from './Phase.model';
export * from './Slot.model';
export * from './Path.model';

export * from './Setup.model';
export * from './ImageAsset.model';
export * from './Base.model';
export * from './Keyword.model';
export * from './Style.model';
export * from './Sound.model';
export * from './Expression.model';
export * from './Animation.model';
export * from './Handler.model';
export * from './Transition.model';
export * from './Text.model';
export * from './Sonata.model';
export * from './Shape.model';

export * from './types';

import { GameAction } from './Action.model';
import { Condition } from './Condition.model';
import { Round } from './Round.model';
import { Choice } from './Choice.model';
import { Stage } from './Stage.model';
import { Faction } from './Faction.model';
import { Token } from './Token.model';
import { Phase } from './Phase.model';
import { PathEntity } from './Path.model';
import { Slot } from './Slot.model';
import { Setup } from './Setup.model';
import { Dictionary } from '@app/shared';
import { ImageAsset } from './ImageAsset.model';
import { Game } from '../models';
import { Keyword } from './Keyword.model';
import { Style } from './Style.model';
import { Sound } from './Sound.model';
import { Expression } from './Expression.model';
import { Handler } from './Handler.model';
import { Animation } from './Animation.model';
import { Transition } from './Transition.model';
import { Text } from './Text.model';
import { Sonata } from './Sonata.model';
import { Shape } from './Shape.model';

export type GameEntity = Game | GameAction | Slot | PathEntity | Condition |
    Round | Choice | Stage | Faction | Token | Phase |
    Setup | ImageAsset | Keyword | Style | Sound | Expression
    | Handler | Animation | Transition | Text | Sonata | Shape;

export type GameEntityList = Dictionary<GameEntity>;

export * from './types';
