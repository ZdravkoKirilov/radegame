import { cond } from 'lodash';

import { GameAction, Setup, ActionConfig, ACTION_TYPE } from "../entities";
import { MutatorAction, ChangeTurn, ChangeRound } from "@app/game-arena";
import { GameState, GameConfig } from "../models";

type ActionsTransformerPayload = {
    actions: GameAction[];
    state: GameState;
    config: GameConfig;
};

type SingleActionTransformerPayload = {
    action: GameAction;
    state: GameState;
    config: GameConfig;

    action_config?: ActionConfig;
};

type ActionsTransformer = (payload: ActionsTransformerPayload) => MutatorAction[];
type SingleActionTransformer = (payload: SingleActionTransformerPayload) => MutatorAction[];

export const transformToMutators: ActionsTransformer = (payload) => {
    return reduceMutators(payload);
};

const reduceMutators: ActionsTransformer = ({ actions, state, config }) => {
    return actions.reduce((total, action) => {
        const nextActions = reduceMutatorsForAction({ action, state, config });
        total = [...total, ...nextActions];
        return total;
    }, []);
};

const reduceMutatorsForAction: SingleActionTransformer = (payload) => {
    return payload.action.configs.reduce(
        (total, action_config) => {
            total = [...total, ...delegateByActionType({ ...payload, action_config })];
            return total;
        },
        []
    );
};

const delegateByActionType: SingleActionTransformer = (payload) => {
    switch (payload.action_config.type) {
        case ACTION_TYPE.END_TURN:
            return handleEndTurn(payload);
        default:
            return [];
    }
};

const handleEndTurn: SingleActionTransformer = ({ state, config }) => {
    let { active_player, turn_order, round, setup } = state;
    const setupData: Setup = config.setups[setup];
    const rounds = setupData.rounds.map(elem => elem.id);

    let nextRound = null;
    if (turn_order[turn_order.length - 1] === active_player) {
        active_player = turn_order[0];
        nextRound = rounds[rounds.indexOf(round) + 1];
    } else {
        active_player = turn_order[turn_order.indexOf(active_player) + 1];
    }
    return [
        new ChangeTurn(active_player),
        nextRound ? new ChangeRound(nextRound) : null,
    ];
};