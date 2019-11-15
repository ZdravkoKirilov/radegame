import { ACTION_TYPE } from "../entities";
import { MultiActionsTransformer, SingleActionTransformer } from "../models";
import { handleEndTurn } from "./action-handlers/handleEndTurn";
import { mutateState } from "./action-handlers/mutateState";

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
        case ACTION_TYPE.END_TURN:
            return handleEndTurn(payload);
        case ACTION_TYPE.MUTATE_STATE:
            return mutateState(payload);
        default:
            return [];
    }
};

