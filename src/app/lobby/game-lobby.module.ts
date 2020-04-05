import { NgModule } from '@angular/core';
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
import { LiveLobbyService } from './services/live-lobbies.service';
import { LobbyChatComponent } from './components/lobby/chat/lobby-chat.component';

@NgModule({
	declarations: [
		LobbyFormComponent,
		LobbiesPageComponent,
		GameLobbiesComponent,
		ListLayoutComponent,
		LobbyListItemComponent,
		LobbyPageComponent,
		GameLobbyComponent,
		LobbyChatComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature(FEATURE_NAME, mainReducer),
		EffectsModule.forFeature([LobbyEffects])
	],
	exports: [RouterModule, LobbyFormComponent],
	providers: [LiveLobbyService]
})
export class GameLobbyModule { }
