import {
    Faction, Field, GameAction,
    Condition, Stage, Round, Slot,
    PathEntity, Choice, Team, Setup, Phase, Token
} from '../entities';
import { Dictionary } from '@app/shared';

export type GameTemplate = Partial<{
    factions: Dictionary<Faction>;
    actions: Dictionary<GameAction>;
    fields: Dictionary<Field>;
    conditions: Dictionary<Condition>;
    rounds: Dictionary<Round>;
    stages: Dictionary<Stage>;
    locations: Dictionary<Slot>;
    paths: Dictionary<PathEntity>;
    choices: Dictionary<Choice>;
    teams: Dictionary<Team>;
    setups: Dictionary<Setup>;
    phases: Dictionary<Phase>;
    tokens: Dictionary<Token>;
}>


