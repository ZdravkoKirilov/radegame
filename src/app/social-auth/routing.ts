import { Routes } from '@angular/router';

import { GoogleSignInComponent, FacebookSignInComponent } from './components';

export const routes: Routes = [

    {
        path: 'google',
        component: GoogleSignInComponent
    }, {
        path: 'facebook',
        component: FacebookSignInComponent
    }


];
