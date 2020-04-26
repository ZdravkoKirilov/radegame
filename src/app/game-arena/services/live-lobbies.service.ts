import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { LOBBY_URLS } from '@app/core';
import { CreateLobby, DeleteLobby, SavePlayer, DeletePlayer, SendMessage, FetchLobbies, LobbyAction, CreateGame } from '../state';

@Injectable()
export class LiveLobbyService extends Subject<LobbyAction> implements OnDestroy {

	private lobbiesSocket: WebSocket;
	private singleLobbySocket: WebSocket;

	ngOnDestroy() {
		this.closeMultiLobby();
		this.closeSingleLobby();
	}

	closeMultiLobby() {
		this.lobbiesSocket && this.lobbiesSocket.close();
	}

	closeSingleLobby() {
		this.singleLobbySocket && this.singleLobbySocket.close();
	}

	listenForLobbies(gameId: number, autoFetch = true) {

		this.lobbiesSocket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES(gameId));

		this.lobbiesSocket.onmessage = event => {
			const data = JSON.parse(event.data);
			this.next(data);
		};

		if (autoFetch) {
			this.lobbiesSocket.onopen = () => {
				this.lobbiesSocket.send(JSON.stringify(new FetchLobbies({ gameId })));
			}
		}
	}

	listenInLobby(gameId: number, lobbyName: string) {

		this.singleLobbySocket = new WebSocket(LOBBY_URLS.LIVE_LOBBIES(gameId, lobbyName));

		this.singleLobbySocket.onmessage = (e: MessageEvent) => {
			const data: LobbyAction = JSON.parse(e.data);
			this.next(data);
		};
	}

	fetchLobbies(action: FetchLobbies) {
		this.lobbiesSocket.send(JSON.stringify(action));
	}

	createLobby(action: CreateLobby) {
		this.lobbiesSocket.send(JSON.stringify(action));
	}

	deleteLobby(action: DeleteLobby) {
		this.lobbiesSocket.send(JSON.stringify(action));
	}

	savePlayer(action: SavePlayer) {
		this.lobbiesSocket.send(JSON.stringify(action));
	}

	updatePlayer(action: SavePlayer) {
		this.singleLobbySocket.send(JSON.stringify(action));
	}

	deletePlayer(action: DeletePlayer) {
		this.singleLobbySocket.send(JSON.stringify(action));
	}

	sendMessage(action: SendMessage) {
		this.lobbiesSocket.send(JSON.stringify(action));
	}

	sendScopedMessage(action: SendMessage) {
		this.singleLobbySocket.send(JSON.stringify(action));
	}

	createGame(action: CreateGame) {
		this.singleLobbySocket.send(JSON.stringify(action))
	}
}
