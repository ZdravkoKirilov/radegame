import { BaseModel, WithDisplayName } from "./Base.model";

export type EntityState = BaseModel & WithDisplayName & {
    style: number; // Style
    sound: number; // Sound
    animation: number; // Animation
};