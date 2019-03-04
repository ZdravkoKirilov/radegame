import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { LOBBY_URLS } from '@app/core';
import { CreatePlayer, UpdatePlayer, DeletePlayer } from '../state';

@Injectable()
export class LiveLobbyService {

	private stream$ = new Subject<Action>();
	private socket: WebSocket;

	public ofType<T extends Action>(...types: string[]) {
		return this.stream$.pipe(
			filter((action) => types.some(type => type === action.type))
		) as Observable<T>;
	}

	constructor() {
		this.socket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES);

		this.socket.onopen = () => {
			// this.socket.send(JSON.stringify({ 'message': 'Hello from client!' }));
		};

		this.socket.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data);
			this.stream$.next(data);
		};

		this.socket.onclose = (e: CloseEvent) => {

		};
	}

	savePlayer(action: CreatePlayer | UpdatePlayer) {
		debugger;
		this.socket.send(JSON.stringify({
			type: action.type,
			payload: action.payload,
		}));
	}

	removePlayer(action: DeletePlayer) {
		debugger;
		this.socket.send(JSON.stringify({
			type: action.type,
			payload: action.payload,
		}));
	}
}
