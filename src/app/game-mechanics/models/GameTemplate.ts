import { Movement } from './Movement';
import { TriviaList } from './Trivia';
import { ResourceList } from './Resource';
import { CharacterList } from './Character';
import { AbilityList } from './Ability';
import { TrapsList } from './Trap';
import { EffectsList } from './FieldEffect';
import { EndCondition } from './EndCondition';
import { GameMetadata } from './GameMetadata';

export interface GameTemplate {
    id?: number;
    metadata?: GameMetadata;
    movements?: Movement;
    endCondition?: EndCondition;
    trivia?: TriviaList;
    resources?: ResourceList;
    characters?: CharacterList;
    abilities?: AbilityList;
    traps?: TrapsList;
    effects?: EffectsList;
}
