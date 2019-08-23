import { BaseModel, WithBoard, WithStyle, WithType, WithState, WithImage } from "./Base.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithState & WithImage & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: number; // Expression

    items: number[]; // could be anything
    use_layout: number; // Expression // Determines how to stack items[] visually

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