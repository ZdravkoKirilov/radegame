import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import { StateStoreModule } from '../state-store/state-store.module';
import { AppRoutingModule } from '../app-routing.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { HomeModule } from '../home/home.module';
import { GameCreatorModule } from '../game-creator/game-creator.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        StateStoreModule,
        AppRoutingModule,
        StoreRouterConnectingModule,
        HomeModule,
        GameCreatorModule
    ],
    exports: [
        AppRoutingModule
    ],
    declarations: []
})
export class CoreModule {
}
