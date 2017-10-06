import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';

export const routes: Routes = [
    {
        path: 'games/editor',
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: []
    }
];
