import {
    RenderFunction, RzElementType, RzElementProps,
    AnimatableProps, withBasicInteractions, createElement, RzTransition
} from "@app/render-kit"
import { RuntimeTransition } from "../../entities";
import { AppState } from "@app/core";
import { selectGameState } from "@app/game-arena";
import { connect } from "../store";
import { Dictionary } from "@app/shared";
import { GameState } from "app/game-mechanics/models";

export type ArenaTransitionProps = {
    transitions: RuntimeTransition[];
    data: Dictionary;
} & RzElementProps;

export type ArenaTransitionOutputProps = ArenaTransitionProps & {
    interpolatedData: Dictionary;
};

type StoreProps = {
    game_state?: GameState;
};

export const withArenaTransition = <T = any>(component: RzElementType<ArenaTransitionOutputProps & T>) => {
    const ArenaTransition: RenderFunction<ArenaTransitionProps & StoreProps & T> = (props) => {
        return createElement(RzTransition, {
            transitions: props.transitions,
            global_state: props.game_state
        }, (interpolatedData: any) => createElement(component, {
            ...props,
            interpolatedData
        }));
    };

    const mapStateToProps = (state: AppState): StoreProps => ({
        game_state: selectGameState(state),
    });

    return withBasicInteractions(connect(mapStateToProps)(ArenaTransition)) as RzElementType<ArenaTransitionOutputProps & T>;
};