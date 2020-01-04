import { SingleActionTransformer } from "../../models";
import { MutateState } from "@app/game-arena";

export const mutateState: SingleActionTransformer = ({ action_config }) => {
    return [new MutateState(action_config.payload[0])];
};