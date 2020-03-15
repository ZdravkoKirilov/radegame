import { Routes } from "@angular/router";
import { GameArenaRootComponent } from "./pages/game-arena-root.component";
import { ROUTER_PARAMS } from "@app/shared";
import { CustomRouteData } from "@app/core";
import { GameMenuRootComponent } from "./pages/game-menu-root.component";

export const routes: Routes = [
    {
        path: `:${ROUTER_PARAMS.GAME_ID}/menu`,
        component: GameMenuRootComponent,
        data: <CustomRouteData>{
            title: 'Radegast: game menu',
            hide_game_warning: true,
        },
    },
    {
        path: `:${ROUTER_PARAMS.GAME_INSTANCE_ID}/live`,
        component: GameArenaRootComponent,
        data: <CustomRouteData>{
            title: 'Radegast: game arena',
            hide_game_warning: true,
        },
    },
];