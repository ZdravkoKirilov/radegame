import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { routeData } from '../shared/models/RouteData';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: [],
        data: routeData({
            title: 'Welcome to radegast'
        })
    }
];
