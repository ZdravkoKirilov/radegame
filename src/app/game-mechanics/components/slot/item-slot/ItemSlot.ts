import { RenderFunction, createElement, AnimatableProps } from "@app/render-kit";
import { Slot } from '../../../entities';

export type Props = {
    data: Slot;
    interpolatedStyle?: AnimatableProps;
};

export const ItemSlot: RenderFunction<Props> = ({ data, interpolatedStyle }) => {
    return createElement('fragment');
};