import { BaseModel, WithBoard, WithStyle } from "./Base.model";

export type Slot = BaseModel & WithBoard & WithStyle & Partial<{
    owner: number; // Stage;

    field: number; // Field. Static field for the location
    draw: number; // Source. This is the draw deck.

    y: number;
    x: number;
}>