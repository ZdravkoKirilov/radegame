import { BaseModel } from "./Base.model";

export type EntityState = BaseModel & {

    keyword: number; // Keyword
    style: number; // Style
    sound: number; // Sound
}

// could be reused with a keyword - e.g. "undead" - can play similar themed music for different types of entities