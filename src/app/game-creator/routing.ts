import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';

export const routes: Routes = [
    {
        path: 'create',
        component: IndexComponent,
        canActivate: []
    }
];
