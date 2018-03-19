import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: any;
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    let params = {...route.params};
    let resolvers = { ...routerState.root.data};

    while (route.firstChild) {
      route = route.firstChild;
      params = {...params, ...route.params};
    }

    const { url, root: { queryParams } } = routerState;
    const { data } = route;

    return { url, params, queryParams, data };
  }
}