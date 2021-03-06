import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'editor', loadChildren: () => import('./game-editor').then(m => m.GameEditorModule)
    },
    {
        path: 'profile', loadChildren: () => import('./profile').then(m => m.ProfileModule)
    },
    {
        path: 'catalog', loadChildren: () => import('./catalog').then(m => m.CatalogModule)
    },
    {
        path: 'arena', loadChildren: () => import('./game-arena').then(m => m.GameArenaModule)
    },
    {
        path: 'signin/social',
        loadChildren: () => import('app/social-auth/social-auth.module').then(m => m.SocialAuthModule)
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