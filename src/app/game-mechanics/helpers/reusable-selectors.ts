import { enrichEntity, parseAndBind } from "./misc";
import {
    Slot, RuntimeSlot, GameEntity, ImageFrame,
    SlotHandler, Transition, RuntimeTransition, RuntimeAnimation,
    AnimationStep, RuntimeAnimationStep, Animation
} from "../entities";
import { Dictionary, safeJSON } from "@app/shared";

export const enrichSlot = (config: Dictionary<GameEntity>, context: Dictionary, initialSlot: Slot) => {
    const slot = enrichEntity<Slot, RuntimeSlot>(config, {
        style: src => parseAndBind(context)(src),
        style_inline: value => safeJSON(value, null),
        handlers: handler => enrichEntity<SlotHandler>(config, {
            effect: src => parseAndBind(context)(src),
            sound: src => parseAndBind(context)(src),
        }, handler),
        item: (value: string) => safeJSON(value, null),
        shape: (shapeId: string) => enrichEntity(config, {
            style_inline: (src: string) => safeJSON(src, {})
        }, config.shapes[shapeId]),
        display_text: src => parseAndBind(context)(src),
        transitions: transitionId => enrichEntity<Transition, RuntimeTransition>(config, {
            animation: (animationId: string) => enrichEntity<Animation, RuntimeAnimation>(config, {
                steps: (item: AnimationStep) => enrichEntity<AnimationStep, RuntimeAnimationStep>(config, {
                    from_style_inline: (src: string) => safeJSON(src, {}),
                    to_style_inline: (src: string) => safeJSON(src, {}),
                    from_value: (src: string) => parseAndBind(context)(src),
                    to_value: (src: string) => parseAndBind(context)(src),
                    output_transformer: src => parseAndBind(context)(src),
                }, item),
            }, config.animations[animationId] as Animation),
            trigger: src => parseAndBind(context)(src)
        }, config.transitions[transitionId] as Transition)
    }, initialSlot);

    return slot;
};