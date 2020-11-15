import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared';
import { AppRoutingModule } from '../app-routing.module';

import { CoreEffectsService, reducers } from './state';
import { CustomRouterSerializer } from './router-custom.serializer';
import {
    AuthService, GameEditService,
} from './services';
import { AuthInterceptor } from './http';
import { HomeModule } from '../home';
import { NotFoundComponent } from './components';
import { OrchestratorComponent } from './components/orchestrator/orchestrator.component';
import { PageTitleProviderComponent } from './components/page-title/page-title-provider.component';
import { ActiveGamesProviderComponent } from './components/active-games/active-games-provider.component';
import { CurrentUserProviderComponent } from './components/current-user/current-user-provider.component';

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
        StoreRouterConnectingModule.forRoot(),
        HomeModule,
        AppRoutingModule,
    ],
    exports: [AppRoutingModule, OrchestratorComponent],
    declarations: [NotFoundComponent, OrchestratorComponent, PageTitleProviderComponent, ActiveGamesProviderComponent, CurrentUserProviderComponent],
    providers: [
        Title,
        GameEditService, AuthService,
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class CoreModule {
}
