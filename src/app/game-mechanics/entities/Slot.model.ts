import { BaseModel, WithPermissions, WithBoard, WithKeywords, WithStyle } from "./Base.model";

export type Slot = BaseModel & WithPermissions & WithBoard & WithKeywords & WithStyle & Partial<{
    owner: number; // Stage;

    field: number; // Field. Static field for the location
    draw: number; // Source. This is the draw deck.
    // tokens are entirely runtime situated on the field

    y: number;
    x: number;
}>