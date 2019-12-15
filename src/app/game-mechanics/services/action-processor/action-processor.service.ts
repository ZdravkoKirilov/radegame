import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameAction } from '../../entities';
import { MutatorAction, selectGameState, selectGameConfig } from '@app/game-arena';
import { AppState } from '@app/core';
import { AutoUnsubscribe } from '@app/shared';
import { transformToMutators } from '../../helpers/actions';
import {  GameConfig, GameState } from '../../models';

@Injectable()
@AutoUnsubscribe()
export class ActionProcessorService {

  state$: Subscription;
  config$: Subscription;

  state: GameState;
  config: GameConfig;

  constructor(private store: Store<AppState>) {
    this.state$ = this.store.pipe(select(selectGameState), map(state => this.state = state)).subscribe();
    this.config$ = this.store.pipe(select(selectGameConfig), map(config => this.config = config)).subscribe();
  }

  toMutators(actions: GameAction[]): MutatorAction[] {
    const { state, config } = this;
    const mutators = transformToMutators({ actions, state, config });
    return mutators;
  }
}
