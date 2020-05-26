import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Injectable } from "@angular/core";

import { SandboxType } from '@app/game-mechanics';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: CustomRouteData;
}

export type CustomRouteData = Partial<{
  title: string;
  hide_game_warning: boolean;
  sandbox_type: SandboxType;
}>;

@Injectable()
export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    let params = { ...route.params };
    let { data } = route;

    while (route.firstChild) {
      route = route.firstChild;
      params = { ...params, ...route.params };
      data = { ...data, ...route.data };
    }
    data = { ...data, ...route.data };

    const { url, root: { queryParams } } = routerState;

    return { url, params, queryParams, data };
  }
}