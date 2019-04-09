import {
    Faction, Field, GameAction,
    Condition, Stage, Round, Slot,
    PathEntity, Choice, Team, Setup, Phase, Token,
    ImageAsset,
    GameEntity,
    GameEntityList
} from '../entities';
import { Dictionary, WithKeysAs, Omit } from '@app/shared';
import { formKeys } from '@app/game-editor';

// export type GameTemplate = Partial<{
//     factions: Dictionary<Faction>;
//     actions: Dictionary<GameAction>;
//     fields: Dictionary<Field>;
//     conditions: Dictionary<Condition>;
//     rounds: Dictionary<Round>;
//     stages: Dictionary<Stage>;
//     locations: Dictionary<Slot>;
//     paths: Dictionary<PathEntity>;
//     choices: Dictionary<Choice>;
//     teams: Dictionary<Team>;
//     setups: Dictionary<Setup>;
//     phases: Dictionary<Phase>;
//     tokens: Dictionary<Token>;
//     images: Dictionary<ImageAsset>;
// }>

// export type GameData = Partial<{
//     factions: Faction[];
//     actions: GameAction[];
//     fields: Field[];
//     conditions: Condition[];
//     rounds: Round[];
//     stages: Stage[];
//     locations: Slot[];
//     paths: PathEntity[];
//     choices: Choice[];
//     teams: Team[];
//     setups: Setup[];
//     phases: Phase[];
//     tokens: Token[];
//     images: ImageAsset[];
// }>

export type GameData = Omit<WithKeysAs<typeof formKeys, GameEntity>, 'games'>;
export type GameTemplate = Omit<WithKeysAs<typeof formKeys, GameEntityList>, 'games'>;
