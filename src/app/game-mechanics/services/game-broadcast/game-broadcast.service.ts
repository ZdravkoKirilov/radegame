import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ARENA_URLS } from '@app/core';

@Injectable()
export class GameBroadcastService {

  private stream$ = new Subject<any>();
  private socket: WebSocket;

  public ofType<T extends any>(...types: string[]) {
    return this.stream$.pipe(
      filter((action) => types.some(type => type === action.type))
    ) as Observable<T>;
  }

  initConnection(game_name: string) {
    const url = ARENA_URLS.LIVE_ARENA(game_name);
    debugger;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {

    };

    this.socket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      this.stream$.next(data);
    };

    this.socket.onclose = (e: CloseEvent) => {

    };

    this.socket.onerror = (e: ErrorEvent) => {

    }
  }

  closeConnection() {
    this.socket.close();
  }

  sendActions(actions: any[]) {
    if (this.socket) {
      this.socket.send(JSON.stringify(actions));
    }
  }
}
