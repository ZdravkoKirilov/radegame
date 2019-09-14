import { Routes } from "@angular/router";
import { GameArenaRootComponent } from "./pages/game-arena-root.component";
import { ROUTER_PARAMS } from "@app/shared";
import { CustomRouteData } from "@app/core";

export const routes: Routes = [
    {
        path: `:${ROUTER_PARAMS.GAME_INSTANCE_ID}`,
        component: GameArenaRootComponent,
        data: <CustomRouteData>{
            title: 'Radegast: game arena',
            hide_game_warning: true,
        },
    },
];