export * from './Action.model';
export * from './Condition.model';
export * from './Round.model';
export * from './Choice.model';
export * from './Stage.model';
export * from './Field.model';
export * from './Faction.model';
export * from './Team.model';
export * from './Token.model';
export * from './Phase.model';
export * from './Slot.model';
export * from './Path.model';
export * from './types';
export * from './Setup.model';
export * from './Source.model';
export * from './ImageAsset.model';
export * from './Base.model';
export * from './Keyword.model';
export * from './Group.model';
export * from './Style.model';

import { GameAction } from './Action.model';
import { Condition } from './Condition.model';
import { Round } from './Round.model';
import { Choice } from './Choice.model';
import { Stage } from './Stage.model';
import { Field } from './Field.model';
import { Faction } from './Faction.model';
import { Team } from './Team.model';
import { Token } from './Token.model';
import { Phase } from './Phase.model';
import { PathEntity } from './Path.model';
import { Slot } from './Slot.model';
import { Setup } from './Setup.model';
import { Dictionary } from '@app/shared';
import { Source } from './Source.model';
import { ImageAsset } from './ImageAsset.model';
import { Game } from '../models';
import { Keyword } from './Keyword.model';
import { Group } from './Group.model';
import { Style } from './Style.model';

export type GameEntity = Game & GameAction & Slot & PathEntity & Condition &
    Round & Choice & Stage & Field & Faction & Token & Team & Phase &
    Setup & Source & ImageAsset & Keyword & Group & Style;

export type GameEntityList = Dictionary<GameEntity>;

export * from './types';
