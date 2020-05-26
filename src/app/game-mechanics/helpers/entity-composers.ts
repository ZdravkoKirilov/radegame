import {
    WidgetNode, RuntimeWidgetNode, GameEntity,
    NodeHandler, Transition, RuntimeTransition, RuntimeAnimation,
    AnimationStep, RuntimeAnimationStep, Animation, RuntimeNodeHandler, ImageFrame, RuntimeImageFrame, Widget, RuntimeWidget, Shape, RuntimeShape, RuntimeText, Text, Module, RuntimeModule, Sonata, RuntimeSonata, SonataStep, RuntimeSonataStep, NodeItem, RuntimeNodeItem, Token, RuntimeToken, Choice, RuntimeChoice, RuntimeNodeLifecycle, NodeLifecycle, RuntimeSandbox, Sandbox
} from "../entities";
import { Dictionary, safeJSON } from "@app/shared";
import { enrichEntity, parseAndBind } from "./misc";
import { Game, RuntimeGame, ExpressionContext } from "../models";

export const enrichNode = (context: ExpressionContext, initialNode: WidgetNode) => {
    const config = context.conf;
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

export const enrichHandler = (context: ExpressionContext, handler: NodeHandler) => {
    const config = context.conf;
    return enrichEntity<NodeHandler, RuntimeNodeHandler>(config, {
        effect: src => parseAndBind(context)(src),
        sound: src => parseAndBind(context)(src),
        static_sound: 'sonatas',
    }, handler);
};

export const enrichLifecycle = (context: ExpressionContext, lifecycle: NodeLifecycle) => {
    return enrichEntity<NodeLifecycle, RuntimeNodeLifecycle>(context.conf, {
        effect: src => parseAndBind(context)(src),
        sound: src => parseAndBind(context)(src),
        static_sound: 'sonatas',
    }, lifecycle);
};

export const enrichTransition = (context: ExpressionContext, transition: Transition) => {
    const config = context.conf;
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

export const enrichFrame = (context: ExpressionContext, frame: ImageFrame) => {
    return enrichEntity<ImageFrame, RuntimeImageFrame>(context.conf, {
        widget: 'widgets',
        image: 'images',
        style: src => parseAndBind(context)(src)
    }, frame);
};

export const enrichWidget = (context: ExpressionContext, widget: Widget) => {
    return enrichEntity<Widget, RuntimeWidget>(context.conf, {
        node_getter: src => parseAndBind(context)(src),
        frame_getter: src => parseAndBind(context)(src),
    }, widget);
};

export const enrichShape = (context: ExpressionContext, shape: Shape) => {
    return enrichEntity<Shape, RuntimeShape>(context.conf, {
        style: src => parseAndBind(context)(src),
        style_inline: src => safeJSON(src, {}),
    }, shape);
};

export const enrichText = (context: ExpressionContext, text: Text) => {
    return enrichEntity<Text, RuntimeText>(context.conf, {
        style_inline: src => safeJSON(src, {}),
        style: src => parseAndBind(context)(src)
    }, text)
};

export const enrichItem = (context: ExpressionContext, item: NodeItem) => {
    const config = context.conf;
    return enrichEntity<NodeItem, RuntimeNodeItem>(config, {
        token: tokenId => enrichToken(config, config.tokens[tokenId]),
        choice: choiceId => enrichChoice(context, config.choices[choiceId]),
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

export const enrichGame = (context: ExpressionContext, game: Game) => {
    if (game) {
        return enrichEntity<Game, RuntimeGame>(context.conf, {
            menu: 'modules',
            get_active_module: src => parseAndBind(context)(src),
        }, game);
    }
    return null;
};

export const enrichSandbox = (context: ExpressionContext, sandbox: Sandbox) => {
    if (sandbox) {
        return enrichEntity<Sandbox, RuntimeSandbox>(context.conf, {
            global_state: src => parseAndBind(context)(src),
            own_data: src => parseAndBind(context)(src),
            on_init: src => parseAndBind(context)(src),
            preload: src => parseAndBind(context)(src),
            from_parent: src => parseAndBind(context)(src),
            node: nodeId => {
                const widgets: Widget[] = Object.values(context?.conf?.widgets || {});
                const result = widgets
                    .reduce((total, widget) => {
                        return [...total, ...widget.nodes];
                    }, [])
                    .find(elem => elem.id === nodeId);
                return result;
            },
            widget: 'widgets',
            module: 'modules',
        }, sandbox);
    }
    return null;
};

export const enrichChoice = (context: ExpressionContext, choice: Choice) => {
    if (choice) {
        return enrichEntity<Choice, RuntimeChoice>(context.conf, {
            template: 'widgets',
        }, choice);
    }
    return null;
};

export const enrichModule = (context: ExpressionContext, module: Module) => {
    return enrichEntity<Module, RuntimeModule>(context.conf, {
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