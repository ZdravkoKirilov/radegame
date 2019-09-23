import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GameAction } from '../../entities';
import { MutatorAction, ChangeTurn, selectTurnOrder, selectActivePlayer, selectRounds, selectRound, ChangeRound } from '@app/game-arena';
import { AppState } from '@app/core';
import { AutoUnsubscribe } from '@app/shared';

@Injectable()
@AutoUnsubscribe()
export class ActionProcessorService {

  turn_order$: Subscription;
  active_player$: Subscription;
  rounds$: Subscription;
  round$: Subscription;

  turn_order: number[];
  active_player: number;
  rounds: number[];
  round: number;

  constructor(private store: Store<AppState>) {
    this.turn_order$ = this.store.pipe(
      select(selectTurnOrder),
      filter<number[]>(Boolean),
      map(order => {
        this.turn_order = order;
      })
    ).subscribe();

    this.active_player$ = this.store.pipe(
      select(selectActivePlayer),
      filter<number>(Boolean),
      map(active_player => {
        this.active_player = active_player;
      })
    ).subscribe();

    this.rounds$ = this.store.pipe(
      select(selectRounds),
      filter<number[]>(Boolean),
      map(rounds => this.rounds = rounds),
    ).subscribe();

    this.round$ = this.store.pipe(
      select(selectRound),
      filter<number>(Boolean),
      map(round => this.round = round),
    ).subscribe();
  }

  toMutators(actions: GameAction[]): MutatorAction[] {
    let { active_player, turn_order } = this;
    let nextRound = null;
    if (turn_order[turn_order.length - 1] === active_player) {
      active_player = turn_order[0];
      nextRound = this.rounds[this.rounds.indexOf(this.round) + 1];
    } else {
      active_player = turn_order[turn_order.indexOf(active_player) + 1];
    }
    return [
      new ChangeTurn(active_player),
      nextRound ? new ChangeRound(nextRound) : null,
    ];
  }
}
