import {
    RenderFunction, RzElementType, RzElementProps,
    AnimatableProps, withBasicInteractions, createElement, RzTransition
} from "@app/render-kit"
import { RuntimeTransition } from "../../entities";
import { AppState } from "@app/core";
import { selectExpressionContext } from "@app/game-arena";
import { connect } from "../store";
import { ExpressionContext } from "../../resolvers";
import { Dictionary } from "@app/shared";

export type ArenaTransitionProps = {
    transitions: RuntimeTransition[];
    data: Dictionary;
} & RzElementProps;

export type ArenaTransitionOutputProps = ArenaTransitionProps & {
    interpolatedStyle: AnimatableProps;
};

type StoreProps = {
    context?: ExpressionContext;
};

export const withArenaTransition = <T = any>(component: RzElementType<ArenaTransitionOutputProps & T>) => {
    const ArenaTransition: RenderFunction<ArenaTransitionProps & StoreProps & T> = (props) => {
        return createElement(RzTransition, {
            transitions: props.transitions,
            target: props.data,
            context: props.context
        }, (interpolatedStyle: any) => createElement(component, {
            ...props,
            interpolatedStyle
        }));
    };

    const mapStateToProps = (state: AppState): StoreProps => ({
        context: selectExpressionContext(state),
    });

    return withBasicInteractions(connect(mapStateToProps)(ArenaTransition)) as RzElementType<ArenaTransitionOutputProps & T>;
};