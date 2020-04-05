import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ARENA_URLS, AppState } from '@app/core';
import { ActionProcessorService } from '../action-processor/action-processor.service';
import { GameActionsPayload } from 'app/game-mechanics/models/Payloads';
import { AutoUnsubscribe } from '@app/shared';
import { Player, GameAction } from '@app/game-mechanics';

@Injectable()
@AutoUnsubscribe()
export class GameBroadcastService {

  constructor(private store: Store<AppState>, private processor: ActionProcessorService) {
    // this.self$ = this.store.pipe(select(selectActivePlayerData), map(player => {
    //   this.self = player;
    // })).subscribe();
  }

  private stream$ = new Subject<any>();
  private socket: WebSocket;
  private self$: Subscription;

  private self: Player;

  public ofType<T extends any>(...types: string[]) {
    return this.stream$.pipe(
      filter((action) => types.some(type => type === action.type))
    ) as Observable<T>;
  }

  initConnection(game_name: string) {
    const url = ARENA_URLS.LIVE_ARENA(game_name);
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {

    };

    this.socket.onmessage = (e: MessageEvent) => {
      const data: GameActionsPayload = JSON.parse(e.data);
      const actions = this.processor.toMutators(data.actions);
      if (data.initiator !== this.self.id) {
        actions.filter(Boolean).forEach(action => this.store.dispatch(action));
      }
    };

    this.socket.onclose = (e: CloseEvent) => {
    };

    this.socket.onerror = (e: ErrorEvent) => {
      console.error(e);
    }
  }

  closeConnection() {
    this.socket.close();
  }

  dispatch = (actions: GameAction[], shared = true) => {
    const mutators = this.processor.toMutators(actions);
    mutators.filter(Boolean).forEach(mutator => this.store.dispatch(mutator));
    if (shared) {
      this.sendActions({
        actions, initiator: this.self.id
      });
    }
  }

  private sendActions(actions: GameActionsPayload) {
    if (this.socket) {
      this.socket.send(JSON.stringify(actions));
    }
  }
}
