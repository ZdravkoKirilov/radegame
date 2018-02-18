import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { CoreEffectsService } from './state/effects/core-effects.service';

import { reducers } from './state/reducers/index';
import { CustomRouterSerializer } from './router-custom.serializer';
import { AppRoutingModule } from '../app-routing.module';
import { WindowRefService } from '../shared/services/window-ref.service';
import { HomeModule } from '../home/home.module';
import { GameEditorModule } from '../game-editor/game-editor.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
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
        AppRoutingModule,
    ],
    exports: [AppRoutingModule],
    declarations: [NotFoundComponent],
    providers: [
        Title,
        WindowRefService,
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer }
    ]
})
export class CoreModule {
}
