import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { SignInComponent } from './containers/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: SignInComponent,
        pathMatch: 'full'
    },
];

