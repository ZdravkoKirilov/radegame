import { Condition } from "./Condition.model";
import { Source } from "./Source.model";

export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
    keywords: string;
    image: string;

}>;

export type WithPermissions = Partial<{
    restricted: number[]; // Condition;
    allowed: number[]; // Condition;
}>

export type WithBoard = {
    board: number; // Stage
}

export type WithCost = {
    cost: number; // Source
}

export type WithRisk = {
    risk: number; // Source
}

export type WithCondition = {
    condition: number; // Condition
}

export type WithStakes = {
    done: number; // Source
    undone: number; // Source
}

export type WithReveal = {
    reveal: number;
}