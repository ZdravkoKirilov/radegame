import { ImageAsset } from "./ImageAsset.model";

export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
    keywords: string;
    image: number;
}>;

export type WithPermissions = Partial<{
    enable: number[]; // Condition;
    disable: number[]; // Condition;
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
    reveal_cost: number; // Source
    reveal_slots: number;
}>

export type WithSettings = Partial<{
    settings: number[]; // Condition
}>

export type WithSetups = Partial<{
    setups: number[]; // Setup[]
}>