import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {reducers} from './state/reducers/index';

import {AppRoutingModule} from '../app-routing.module';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {WindowRefService} from '../shared/services/window-ref.service';
import {HomeModule} from '../home/home.module';
import {GameEditorModule} from '../game-editor/game-editor.module';
import {NotFoundComponent} from './components/not-found/not-found.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        HomeModule,
        GameEditorModule,
        AppRoutingModule,
    ],
    exports: [AppRoutingModule],
    declarations: [NotFoundComponent],
    providers: [
        Title,
        WindowRefService
    ]
})
export class CoreModule {
}
