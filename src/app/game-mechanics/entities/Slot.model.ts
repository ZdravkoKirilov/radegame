import { BaseModel, WithBoard, WithStyle, WithType, WithState, WithImage } from "./Base.model";
import { Transition } from "./Transition.model";
import { Expression } from "./Expression.model";
import { InteractiveEntity } from "./types";
import { Handler } from "./Handler.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithState & WithImage & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: number | Expression; // Expression

    items: SlotItem[];

    enabled: number | Expression;

    handlers: SlotHandler[];
    transitions: number[] | Transition[];
}>;

export type SlotHandler = {
    owner: number;
    handler: number | Handler;
};

export type SlotItem = WithType & {
    owner: number; // Slot
    entity: number | InteractiveEntity;
};