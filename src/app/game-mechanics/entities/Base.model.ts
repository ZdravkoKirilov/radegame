export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
    keywords: string;
    image: string;

    setups: number[]; // Edition

}>;

export type WithPermissions = Partial<{
    restricted: number[]; // Condition;
    allowed: number[]; // Condition;
}>

export type WithBoard = Partial<{
    board: number; // Stage
}>

export type WithCost = Partial<{
    cost: number[]; // Source
}>

export type WithRisk = Partial<{
    risk: number[]; // Source
}>

export type WithCondition = Partial<{
    condition: number[]; // Condition
}>

export type WithStakes = Partial<{
    done: number[]; // Source
    undone: number[]; // Source
}>

export type WithReveal = Partial<{
    reveal_cost: number;
    reveal_slots: number;
}>

export type WithSettings = Partial<{
    settings: number[]; // Condition
}>