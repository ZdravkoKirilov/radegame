import { BaseModel, WithPermissions, WithBoard, WithCost, WithStakes, WithReveal, WithSettings } from './Base.model';

export type Condition = BaseModel & WithPermissions & WithBoard &
    WithCost & WithStakes & WithReveal & WithSettings & Partial<{

        mode: ConditionMode;

        clauses: number[]; // Clause[];
    }>

export type ClauseItem = Partial<{
    id: number;
    owner: number; // Condition;

    primary_clause: PrimaryClause;
    secondary_clause: SecondaryClause;

    negative: boolean; // "NOT" mechanics

    condition: number; //Condition;
    action: number; //GameAction;
    token: number; //Token;
    choice: number; //Choice;
    faction: number; //Faction;
    field: number; //Field;
    phase: number; //Phase;
    team: number; //Team;
    round: number; // Round
    path: number; // Path
    slot: number; // Slot

    keywords: string;

    amount: number;

    relation: ClauseRelation;
}>

export const PRIMARY_CLAUSE = {

    INTERSECT: 'INTERSECT', // meet / avoid

    COMPLETE: 'COMPLETE', // other condition(quest)

    HAVE: 'HAVE', // resources, cards
    IS: 'IS', // "NOT" is achieved via relation: NOT. Phase, 

    HAND_SIZE: 'HAND_SIZE', // enforcing rules

    REVEAL_SIZE: 'REVEAL_SIZE', // enforcing rules

    GAIN: 'GAIN', // slot, field, KEYWORD?
    REACH: 'REACH', // slot, resources

    TRIGGER: 'TRIGGER', // action
    REVEAL: 'REVEAL', // when a card gets revealed

    BID: 'BID', // with WIN LOSE TIE

    DISTANCE: 'DISTANCE', // rule for enabling certaion actions. E.g. attacking only at 2 slots distance

    IN: 'IN', // Get bonus in X rounds

    PLAY_WHEN: 'PLAY_AT', // your turn, 

    DROP: 'DROP', // DROP item AT location
}

export const SECONDARY_CLAUSE = {
    MORE: 'MORE', // resources
    LESS: 'LESS', // resource

    MAX: 'MAX', // hand size
    MIN: 'MIN', // hand size

    BEFORE: 'BEFORE', // round, phase
    AFTER: 'AFTER', // round, phase
    AT: 'AT', // round, phase

    TRUE: 'TRUE', // for choices
    FALSE: 'FALSE', // for choices

    WIN: 'WIN', // BID, GAMBLE
    LOSE: 'LOSE', // BID, GAMBLE
    TIE: 'TIE',  // BID, GAMBLE

    YOUR_TURN: 'YOUR_TURN', // when a spell can be played
    ENEMY_TURN: 'ENEMY_TURN', // when a spell can be played
    ALL_TURNS: 'ALL_TURNS', // when a spell can be played

    RESPONSE_TO: 'RESPONSE_TO', // response to: spell with keyword, specific spell
}

export const CLAUSE_RELATIONS = {
    AND: 'AND',
    OR: 'OR',
}

export const CONDITION_MODES = {
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
    PASSIVE: 'PASSIVE',
    RULE: 'RULE',
}

export type ConditionMode = keyof typeof CONDITION_MODES;
export type ClauseRelation = keyof typeof CLAUSE_RELATIONS;
export type PrimaryClause = keyof typeof PRIMARY_CLAUSE;
export type SecondaryClause = keyof typeof SECONDARY_CLAUSE;


// BID + WIN + keyword/token ( the type that was bidded) = Done effect => GOT like outcomes for different challenges. Military,
// Intrigue, Power etc






