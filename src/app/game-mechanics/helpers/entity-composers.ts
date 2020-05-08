import {
    WidgetNode, RuntimeWidgetNode, GameEntity,
    NodeHandler, Transition, RuntimeTransition, RuntimeAnimation,
    AnimationStep, RuntimeAnimationStep, Animation, RuntimeNodeHandler, ImageFrame, RuntimeImageFrame, Widget, RuntimeWidget, Shape, RuntimeShape, RuntimeText, Text, Module, RuntimeModule, Sonata, RuntimeSonata, SonataStep, RuntimeSonataStep, NodeItem, RuntimeNodeItem, Token, RuntimeToken, Choice, RuntimeChoice, RuntimeNodeLifecycle, NodeLifecycle
} from "../entities";
import { Dictionary, safeJSON } from "@app/shared";
import { enrichEntity, parseAndBind } from "./misc";

export const enrichNode = (config: Dictionary<GameEntity>, context: Dictionary, initialNode: WidgetNode) => {
    const node = enrichEntity<WidgetNode, RuntimeWidgetNode>(config, {
        style: src => parseAndBind(context)(src),
        style_inline: value => safeJSON(value, null),
        item: (value: string) => safeJSON(value, null),
        shape: (shapeId: string) => enrichEntity(config, {
            style_inline: (src: string) => safeJSON(src, {})
        }, config.shapes[shapeId]),
        display_text: src => parseAndBind(context)(src),
        consume_context: src => parseAndBind(context)(src),
        provide_context: src => parseAndBind(context)(src),
        display_text_inline: 'texts',
        board: 'widgets',
    }, initialNode);

    return node;
};

export const enrichHandler = (config: Dictionary<GameEntity>, context: Dictionary, handler: NodeHandler) => {
    return enrichEntity<NodeHandler, RuntimeNodeHandler>(config, {
        effect: src => parseAndBind(context)(src),
        sound: src => parseAndBind(context)(src),
        static_sound: 'sonatas',
    }, handler);
};

export const enrichLifecycle = (config: Dictionary<GameEntity>, context: Dictionary, lifecycle: NodeLifecycle) => {
    return enrichEntity<NodeLifecycle, RuntimeNodeLifecycle>(config, {
        effect: src => parseAndBind(context)(src),
        sound: src => parseAndBind(context)(src),
        static_sound: 'sonatas',
    }, lifecycle);
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
        widget: 'widgets',
        image: 'images',
        style: src => parseAndBind(context)(src)
    }, frame);
};

export const enrichWidget = (config: Dictionary<GameEntity>, context: Dictionary, widget: Widget) => {
    return enrichEntity<Widget, RuntimeWidget>(config, {
        node_getter: src => parseAndBind(context)(src),
        frame_getter: src => parseAndBind(context)(src),
    }, widget);
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

export const enrichItem = (config: Dictionary<GameEntity>, context: Dictionary, item: NodeItem) => {
    return enrichEntity<NodeItem, RuntimeNodeItem>(config, {
        token: tokenId => enrichToken(config, config.tokens[tokenId]),
        choice: choiceId => enrichChoice(config, context, config.choices[choiceId]),
    }, item);
};

export const enrichToken = (config: Dictionary<GameEntity>, token: Token) => {
    if (token) {
        return enrichEntity<Token, RuntimeToken>(config, {
            template: 'widgets',
        }, token);
    }
    return null;
};

export const enrichChoice = (config: Dictionary<GameEntity>, context: Dictionary, choice: Choice) => {
    if (choice) {
        return enrichEntity<Choice, RuntimeChoice>(config, {
            template: 'widgets',
        }, choice);
    }
    return null;
};

export const enrichModule = (config: Dictionary<GameEntity>, context: Dictionary, module: Module) => {
    return enrichEntity<Module, RuntimeModule>(config, {
        board: 'widgets',
        loader: 'widgets',
        preload: src => parseAndBind(context)(src),
        load_done: src => parseAndBind(context)(src),
    }, module);
};

export const enrichSonata = (config: Dictionary<GameEntity>, sonata: Sonata) => {
    return enrichEntity<Sonata, RuntimeSonata>(config, {
        steps: step => enrichEntity<SonataStep, RuntimeSonataStep>(config, {
            sound: 'sounds'
        }, step),
    }, sonata);
};