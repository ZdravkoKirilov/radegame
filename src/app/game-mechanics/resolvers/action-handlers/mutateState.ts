import { SingleActionTransformer } from "../../models";
import { toDictionary } from "@app/shared";
import { MutationParams } from "../../entities";

export const mutateState: SingleActionTransformer = ({ state, config, action, action_config }) => {
    const params = toDictionary<any>(action_config.payload, 'key') as MutationParams;
    return [];
};