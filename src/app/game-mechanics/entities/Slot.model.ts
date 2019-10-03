import { BaseModel, WithBoard, WithStyle, WithType, WithState, WithImage } from "./Base.model";
import { Transition } from "./Transition.model";
import { Expression } from "./Expression.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithState & WithImage & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: number; // Expression

    items: SlotItem[];
    use_layout: number; // Expression // Determines how to stack items[] visually
    populate_by: number;

    enabled: number | Expression;

    handlers: SlotHandler[];
    transitions: number[] | Transition[];
}>;

export type SlotHandler = {
    owner: number; // Slot
    handler: number; // Handler
};

export type SlotItem = WithType & {
    owner: number; // Slot
    action: number; // foreign key
    condition: number; // foreign key
    choice: number; // foreign key
    field: number; // foreign key
    token: number; // foreign key
};