import { BaseModel, WithBoard, WithStyle, WithType, WithState, WithFrames, WithImage } from "./Base.model";
import { Transition } from "./Transition.model";
import { Expression } from "./Expression.model";
import { InteractiveEntity } from "./types";
import { Handler } from "./Handler.model";
import { Shape } from "./Shape.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithImage & WithState & WithFrames & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: number | Expression; // returns Text
    display_text_inline: string;

    items: SlotItem[];
    shape: number | Shape; // Shape

    enabled: number | Expression;
    enabled_inline: string;

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