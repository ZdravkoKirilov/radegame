import {
    Slot, RuntimeSlot, GameEntity,
    SlotHandler, Transition, RuntimeTransition, RuntimeAnimation,
    AnimationStep, RuntimeAnimationStep, Animation, RuntimeSlotHandler, ImageFrame, RuntimeImageFrame, Stage, RuntimeStage, Shape, RuntimeShape, RuntimeText, Text, Round, RuntimeRound
} from "../entities";
import { Dictionary, safeJSON } from "@app/shared";
import { enrichEntity, parseAndBind } from "./misc";

export const enrichSlot = (config: Dictionary<GameEntity>, context: Dictionary, initialSlot: Slot) => {
    const slot = enrichEntity<Slot, RuntimeSlot>(config, {
        style: src => parseAndBind(context)(src),
        style_inline: value => safeJSON(value, null),
        item: (value: string) => safeJSON(value, null),
        shape: (shapeId: string) => enrichEntity(config, {
            style_inline: (src: string) => safeJSON(src, {})
        }, config.shapes[shapeId]),
        display_text: src => parseAndBind(context)(src),
        display_text_inline: 'texts',
        board: 'stages',
    }, initialSlot);

    return slot;
};

export const enrichHandler = (config: Dictionary<GameEntity>, context: Dictionary, handler: SlotHandler) => {
    return enrichEntity<SlotHandler, RuntimeSlotHandler>(config, {
        effect: src => parseAndBind(context)(src),
        sound: src => parseAndBind(context)(src),
    }, handler);
};

export const enrichTransition = (config: Dictionary<GameEntity>, context: Dictionary, transition: Transition) => {
    return enrichEntity<Transition, RuntimeTransition>(config, {
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
    }, transition);
};

export const enrichFrame = (config: Dictionary<GameEntity>, context: Dictionary, frame: ImageFrame) => {
    return enrichEntity<ImageFrame, RuntimeImageFrame>(config, {
        stage: 'stages',
        image: 'images',
        style: src => parseAndBind(context)(src)
    }, frame);
};

export const enrichStage = (config: Dictionary<GameEntity>, context: Dictionary, stage: Stage) => {
    return enrichEntity<Stage, RuntimeStage>(config, {
        slot_getter: src => parseAndBind(context)(src),
        frame_getter: src => parseAndBind(context)(src),
    }, stage);
};

export const enrichShape = (config: Dictionary<GameEntity>, context: Dictionary, shape: Shape) => {
    return enrichEntity<Shape, RuntimeShape>(config, {
        style: src => parseAndBind(context)(src),
        style_inline: src => safeJSON(src, {}),
    }, shape);
};

export const enrichText = (config: Dictionary<GameEntity>, context: Dictionary, text: Text) => {
    return enrichEntity<Text, RuntimeText>(config, {
        style_inline: src => safeJSON(src, {}),
        style: src => parseAndBind(context)(src)
    }, text)
};

export const enrichRound = (config: Dictionary<GameEntity>, context: Dictionary, round: Round) => {
    return enrichEntity<Round, RuntimeRound>(config, {
        board: 'stages',
        loader: 'stages',
        preload: src => parseAndBind(context)(src),
        load_done: src => parseAndBind(context)(src),
    }, round);
}