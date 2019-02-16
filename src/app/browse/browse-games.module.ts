import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GamesListPage } from './pages/games-list/games-list.component';
import { GameDetailsPage } from './pages/game-details/game-details.component';
import { SharedModule } from '@app/shared';
import { routes } from './routing';
import { BrowseLayoutComponent } from './layout/browse-layout/browse-layout.component';
import { BrowseHeaderComponent } from './layout/browse-layout/browse-header/browse-header.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { FEATURE_NAME } from './config';
import { mainReducer, BrowseEffects } from './state';
import { GameDetailsComponent } from './components/game-details/game-details.component';


@NgModule({
	declarations: [GamesListPage, GameDetailsPage, BrowseLayoutComponent, BrowseHeaderComponent, GamesListComponent, GameDetailsComponent],
	imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature(FEATURE_NAME, mainReducer),
		EffectsModule.forFeature([BrowseEffects]),
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class BrowseGamesModule { }
