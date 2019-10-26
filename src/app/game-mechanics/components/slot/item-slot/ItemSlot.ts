import { RenderFunction, createElement, AnimatableProps } from "@app/render-kit";
import { Slot } from '../../../entities';

export type ItemSlotProps = {
    data: Slot;
    interpolatedStyle?: AnimatableProps;
};

export const ItemSlot: RenderFunction<ItemSlotProps> = ({ data, interpolatedStyle }) => {
    return createElement('fragment');
};

export default ItemSlot;