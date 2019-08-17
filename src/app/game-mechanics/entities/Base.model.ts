import { ImageFrame } from "./ImageAsset.model";
import { InteractiveEntity } from "./types";

export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
    image: number;
}>;

export type WithType = Partial<{
    entity_type: InteractiveEntity;
}>

export type WithDisplayName = Partial<{
    display_name: string;
}>;

export type WithDone = Partial<{
    done: number; // Expression
}>;

export type WithFrames = Partial<{
    frames: ImageFrame[];
}>;

export type WithKeywords = Partial<{
    keywords: number[];
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
    risk: number[]; // Choice ( random )
}>

export type WithStakes = Partial<{
    passes: number; // Expression
    fails: number; // Expression
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

export type WithStyle = Partial<{
    style: number; // Style
}>

export type WithStates = Partial<{
    states: number[];
}>

export type WithCondition = Partial<{
    condition: number; // Condition
}>;

export type WithState = Partial<{
    state: number; // Expression 
}>;