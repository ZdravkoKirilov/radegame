import { BaseModel, WithBoard, WithStyle, WithType, WithState } from "./Base.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithState & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: number; // Expression

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