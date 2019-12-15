import { Setup } from "../../entities";
import { ChangeTurn, ChangeRound } from "@app/game-arena";
import { SingleActionTransformer } from "../../models";

export const handleEndTurn: SingleActionTransformer = ({ state, config }) => {
    let { active_player, turn_order, round, setup } = state;
    const setupData: Setup = config.setups[setup];
    const rounds = setupData.rounds.map(elem => elem.id);
    let nextRound = null;
    if (turn_order[turn_order.length - 1] === active_player) {
        active_player = turn_order[0];
        nextRound = rounds[rounds.indexOf(round) + 1];
    }
    else {
        active_player = turn_order[turn_order.indexOf(active_player) + 1];
    }
    return [
        new ChangeTurn(active_player),
        nextRound ? new ChangeRound(nextRound) : null,
    ];
};
