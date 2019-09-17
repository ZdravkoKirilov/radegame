import { Player } from "@app/game-mechanics";

export type ActiveGame = {
    game_id: number;
    setup: number;
    players: Player[];
    public_id: number;
};