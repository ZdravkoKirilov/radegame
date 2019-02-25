import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { routes } from './routing';
import { LobbyFormComponent } from './components/form/lobby-form.component';
import { LobbyEffects, mainReducer } from './state';
import { FEATURE_NAME } from './config';
import { SharedModule } from '@app/shared';

@NgModule({
	declarations: [
		LobbyFormComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature(FEATURE_NAME, mainReducer),
		EffectsModule.forFeature([LobbyEffects])
	],
	entryComponents: [
		LobbyFormComponent
	]
})
export class GameLobbyModule { }
