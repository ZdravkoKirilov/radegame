import { BaseModel, WithDisplayName } from "./Base.model";

export type EntityState = BaseModel & WithDisplayName & Partial<{
    style: number; // Style
    sound: number; // Sound
    animation: number; // Animation
    frame: number;
}>;