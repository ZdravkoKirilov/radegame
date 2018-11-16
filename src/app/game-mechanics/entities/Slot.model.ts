import { BaseModel, WithPermissions, WithBoard, WithRisk, WithSettings } from "./Base.model";

export type Slot = BaseModel & WithPermissions & WithBoard & WithRisk & WithSettings & Partial<{
    owner: number; // Stage;

    field: number; // Field. Static field for the location
    tokens: number[]; // Token[]. Both static and dynamic tokens can be siatuated on the location
    source: number[]; // Source. This is the draw deck.

    revealed: number[]; // Source[]. Those are the actions a player/token has by default. He doesnt need to draw them. Static +                      // dynamic

    y: number;
    x: number;
    width: number;
    height: number;
}>