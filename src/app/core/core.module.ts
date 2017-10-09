import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import { StateStoreModule } from '../state-store/state-store.module';
import { AppRoutingModule } from '../app-routing.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { HomeModule } from '../home/home.module';
import { GameCreatorModule } from '../game-creator/game-creator.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        StateStoreModule,
        StoreRouterConnectingModule,
        HomeModule,
        GameCreatorModule,
        AppRoutingModule,
    ],
    exports: [
        AppRoutingModule
    ],
    declarations: [NotFoundComponent]
})
export class CoreModule {
}
