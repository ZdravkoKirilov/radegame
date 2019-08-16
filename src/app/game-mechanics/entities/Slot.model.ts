import { BaseModel, WithBoard, WithStyle, WithType } from "./Base.model";

export type Slot = BaseModel & WithBoard & WithStyle & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    items: number[]; // could be anything
    handlers: number[]; // Handler[]
}>;

export type SlotHandler = {
    owner: number; // Slot
    handler: number; // Handler
};

export type SlotItem = WithType & {
    owner: number; // Slot
    item: number; // foreign key
};