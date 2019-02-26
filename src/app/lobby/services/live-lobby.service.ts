import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { LOBBY_URLS } from '@app/core';

@Injectable({
	providedIn: 'root'
})
export class LiveLobbyService {

	private stream$ = new Subject<Action>();
	private socket: WebSocket;

	public ofType(...types: string[]) {
		return this.stream$.pipe(
			filter((action: Action) => types.some(type => type === action.type))
		);
	}

	constructor() { 
		this.socket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES);

		this.socket.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data);
			this.stream$.next(data);
		};

		this.socket.onclose = (e: CloseEvent) => {

		};
	}

	send(data: object) {
		this.socket.send(JSON.stringify(data));
	}
}
