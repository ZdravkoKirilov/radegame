import { SingleActionTransformer } from "../../models";
import { toDictionary } from "@app/shared";
import { MutationParams } from "../../entities";
import { MutateState } from "@app/game-arena";

export const mutateState: SingleActionTransformer = ({ action_config }) => {
    const params = toDictionary<any>(action_config.payload, 'key') as MutationParams;
    return [new MutateState(params)];
};