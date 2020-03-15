import { MultiActionsTransformer, SingleActionTransformer } from "../models";
import { ACTION_TYPE } from "@app/game-mechanics";
import { mutateState } from "./mutateState";
import { loadFromServer } from "./loadFromServer";

export const transformToMutators: MultiActionsTransformer = (payload) => {
    return reduceMutators(payload);
};

const reduceMutators: MultiActionsTransformer = ({ actions, state, config }) => {
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
        case ACTION_TYPE.MUTATE_STATE:
            return mutateState(payload);
        case ACTION_TYPE.LOAD_FROM_SERVER:
            return loadFromServer(payload);
        default:
            return [];
    }
};

