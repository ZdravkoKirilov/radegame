import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';
import { routes } from './routing';
import { GameArenaRootComponent } from './pages/game-arena-root.component';
import { FEATURE_NAME } from './config';
import { arenaReducer, ArenaEffectsService } from './state';
import { GameLoaderComponent } from './containers/game-data-loader/game-loader.component';
import { GameEngineLoaderComponent } from './containers/game-engine-loader/game-engine-loader.component';


@NgModule({
  declarations: [GameArenaRootComponent, GameLoaderComponent, GameEngineLoaderComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, arenaReducer),
		EffectsModule.forFeature([ArenaEffectsService]),
    RouterModule.forChild(routes),
  ]
})
export class GameArenaModule { }
