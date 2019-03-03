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
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import { GameLobbiesComponent } from './components/lobbies/game-lobbies.component';
import { ListLayoutComponent } from './layout/list-layout/list-layout.component';
import { LobbyListItemComponent } from './components/lobbies/item/lobby-list-item.component';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import { GameLobbyComponent } from './components/lobby/game-lobby.component';
import { LiveLobbyService } from './services/live-lobby.service';

@NgModule({
	declarations: [
		LobbyFormComponent,
		LobbiesPageComponent,
		GameLobbiesComponent,
		ListLayoutComponent,
		LobbyListItemComponent,
		LobbyPageComponent,
		GameLobbyComponent
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
	],
	exports: [RouterModule],
	providers: [LiveLobbyService]
})
export class GameLobbyModule { }
