import { Routes } from '@angular/router';

import { AuthContainerComponent } from './containers/auth/auth-container.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: AuthContainerComponent,
        pathMatch: 'full'
    },
];

