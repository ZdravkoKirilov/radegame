import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { LOBBY_URLS } from '@app/core';
import { CreatePlayer, UpdatePlayer, DeletePlayer, SendMessage } from '../state';

@Injectable()
export class LiveLobbyService {

	private stream$ = new Subject<Action>();
	private socket: WebSocket;
	private lobbySocket: WebSocket;

	public ofType<T extends Action>(...types: string[]) {
		return this.stream$.pipe(
			filter((action) => types.some(type => type === action.type))
		) as Observable<T>;
	}

	initLobby(lobbyName: string) {

		if (this.lobbySocket) {
			this.lobbySocket.close();
		}

		this.lobbySocket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES(lobbyName));

		this.lobbySocket.onopen = () => {

		};

		this.lobbySocket.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data);
			this.stream$.next(data);
		};

		this.lobbySocket.onclose = (e: CloseEvent) => {

		};

		this.lobbySocket.onerror = (e: ErrorEvent) => {

		}
	}

	constructor() {
		this.socket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES());

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
		this.socket.send(JSON.stringify({
			type: action.type,
			payload: action.payload,
		}));
	}

	removePlayer(action: DeletePlayer) {
		this.socket.send(JSON.stringify({
			type: action.type,
			payload: action.payload,
		}));
	}

	sendMessage(action: SendMessage) {
		if (this.lobbySocket) {
			this.lobbySocket.send(JSON.stringify(action));
		}
	}
}
