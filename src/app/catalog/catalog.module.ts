import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GamesListPage } from './pages/games-list/games-list.component';
import { GameDetailsPage } from './pages/game-details/game-details.component';
import { SharedModule } from '@app/shared';
import { routes } from './routing';
import { CatalogLayoutComponent } from './layout/catalog-layout/catalog-layout.component';
import { CatalogHeaderComponent } from './layout/catalog-layout/catalog-header/catalog-header.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { FEATURE_NAME } from './config';
import { mainReducer, CatalogEffects } from './state';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { SetupLinkComponent } from './components/game-details/setup/setup-link.component';
import { SetupDetailsPageComponent } from './pages/setup-details/setup-details-page.component';


@NgModule({
	declarations: [GamesListPage, GameDetailsPage, CatalogLayoutComponent, CatalogHeaderComponent, GamesListComponent, GameDetailsComponent, SetupLinkComponent, SetupDetailsPageComponent],
	imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature(FEATURE_NAME, mainReducer),
		EffectsModule.forFeature([CatalogEffects]),
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class CatalogModule { }
