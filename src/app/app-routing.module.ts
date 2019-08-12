import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'editor', loadChildren: () => import('./game-editor').then(m => m.GameEditorModule)
    },
    {
        path: 'lobby', loadChildren: () => import('./lobby').then(m => m.GameLobbyModule)
    },
    {
        path: 'profile', loadChildren: () => import('./profile').then(m => m.ProfileModule)
    },
    {
        path: 'catalog', loadChildren: () => import('./catalog').then(m => m.CatalogModule)
    },
    {
        path: 'signin/social',
        loadChildren: 'app/social-auth/social-auth.module#SocialAuthModule'
    }, {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }