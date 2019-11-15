import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";

export type InteractiveEntityType = keyof typeof INTERACTIVE_ENTITY;

export const INTERACTIVE_ENTITY = {
    'TOKEN': 'TOKEN',
    'CONDITION': 'CONDITION',
    'ACTION': 'ACTION',
    'CHOICE': 'CHOICE',
} as const;

export type InteractiveEntity = GameAction | Condition | Choice | Token;

export const ALL_ENTITIES = {
    choices: 'choices',
    rounds: 'rounds',
    phases: 'phases',
    conditions: 'conditions',
    stages: 'stages',
    actions: 'actions',
    factions: 'factions',
    tokens: 'tokens',
    slots: 'slots',
    paths: 'paths',
    games: 'games',
    images: 'images',
    keywords: 'keywords',
    styles: 'styles',
    sounds: 'sounds',
    expressions: 'expressions',
    animations: 'animations',
    transitions: 'transitions',
    handlers: 'handlers',
    setups: 'setups',
    texts: 'texts',
    sonatas: 'sonatas',
    shapes: 'shapes',
} as const;

export type AllEntity = keyof typeof ALL_ENTITIES;