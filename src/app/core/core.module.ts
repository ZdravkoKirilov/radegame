import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared';
import { GameEditorModule } from '@app/game-editor';
import { ProfileModule } from '@app/profile';
import { AppRoutingModule } from '../app-routing.module';

import { CoreEffectsService, reducers } from './state';
import { CustomRouterSerializer } from './router-custom.serializer';
import {
    AppLocalStorageService, AuthService, GameEditService,
    WindowRefService
} from './services';
import { AuthInterceptor } from './http';
import { GameDataGuard, GameListGuard } from './guards';
import { HomeModule } from '../home';
import { NotFoundComponent } from './components';

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),
        EffectsModule.forRoot([
            CoreEffectsService
        ]),
        StoreRouterConnectingModule,
        HomeModule,
        GameEditorModule,
        ProfileModule,
        AppRoutingModule,
    ],
    exports: [AppRoutingModule],
    declarations: [NotFoundComponent],
    providers: [
        Title,
        AppLocalStorageService, WindowRefService,
        GameEditService, AuthService,
        GameDataGuard, GameListGuard,
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class CoreModule {
}
