import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component'

export const routes: Routes = [
    {
      path: 'games/create',
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: []
    }
];
