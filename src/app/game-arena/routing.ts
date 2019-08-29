import { Routes } from "@angular/router";
import { GameArenaRootComponent } from "./pages/game-arena-root.component";
import { ROUTER_PARAMS } from "@app/shared";

export const routes: Routes = [
    {
        path: `:${ROUTER_PARAMS.GAME_INSTANCE_ID}`,
        component: GameArenaRootComponent,
        data: {
            title: 'Radegast: game arena'
        },
    },
];