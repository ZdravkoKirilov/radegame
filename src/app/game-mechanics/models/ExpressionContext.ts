import get from "lodash/get";

import { GameState, GameTemplate } from "./Game.model";
import { Dictionary } from "@app/shared";
import { Player } from "./Player";

export type ExpressionContext = {
    loaded_chunks: string[];
    state: GameState;
    conf: GameTemplate;
    players: Dictionary<Player>;
    helpers: {
        [key: string]: any;
    },
    $self: Player,
    $get: typeof get,
};