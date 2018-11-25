import { BaseModel, WithPermissions, WithBoard, WithRisk, WithSettings, WithSetups } from "./Base.model";

export type Slot = BaseModel & WithPermissions & WithBoard & WithRisk & WithSettings & WithSetups & Partial<{
    owner: number; // Stage;

    field: number; // Field. Static field for the location
    draw: number; // Source. This is the draw deck.
    // tokens are entirely runtime situated on the field

    revealed: number[]; // Source[]. Those are the actions a player/token has by default. He doesnt need to draw them. Static +                      // dynamic

    y: number;
    x: number;
    width: number;
    height: number;
}>

// max revealed cards: via settings