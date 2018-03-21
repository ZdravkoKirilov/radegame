import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

import { SharedModule } from '../shared';
import { CoreEffectsService } from './state';
import { reducers } from './state';
import { CustomRouterSerializer } from './router-custom.serializer';
import { AppRoutingModule } from '../app-routing.module';
import { WindowRefService, GameEditService, AuthService } from './services';
import { GameDataResolver } from './resolvers';
import { HomeModule } from '../home';
import { GameEditorModule } from '../game-editor';
import { ProfileModule } from '../profile';
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
        WindowRefService,
        GameEditService,
        AuthService,
        GameDataResolver,
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer }
    ]
})
export class CoreModule {
}
