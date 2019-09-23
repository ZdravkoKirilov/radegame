import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ARENA_URLS, AppState } from '@app/core';
import { GameAction } from '../../entities';
import { ActionProcessorService } from '../action-processor/action-processor.service';

@Injectable()
export class GameBroadcastService {

  constructor(private store: Store<AppState>, private processor: ActionProcessorService) { }

  private stream$ = new Subject<any>();
  private socket: WebSocket;

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
      const data = JSON.parse(e.data);
      this.stream$.next(data);

      const actions = this.processor.toMutators(data);
      actions.filter(Boolean).forEach(action => this.store.dispatch(action));
    };

    this.socket.onclose = (e: CloseEvent) => {
      debugger;
    };

    this.socket.onerror = (e: ErrorEvent) => {
      debugger;
    }
  }

  closeConnection() {
    this.socket.close();
  }

  dispatch = (data: GameAction[]) => {
    const actions = this.processor.toMutators(data);
    // actions.filter(Boolean).forEach(action => this.store.dispatch(action));
    this.sendActions(data);
  }

  private sendActions(actions: GameAction[]) {
    if (this.socket) {
      this.socket.send(JSON.stringify(actions));
    }
  }
}
