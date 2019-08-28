import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOBBY_URLS } from '@app/core';
import { Lobby, LobbyPlayer } from '../models';

@Injectable({
	providedIn: 'root'
})
export class LobbyService {

	constructor(private http: HttpClient) { }

	fetchLobby(name: string) {
		// return Observable.create(observer => {
		// 	observer.next(new Date().getTime() % 2 === 0);
		// });
		return this.http.get<Lobby>(LOBBY_URLS.LOBBIES(name));
	}

	fetchLobbies() {
		return this.http.get<Lobby[]>(LOBBY_URLS.LOBBIES());
	}

	createLobby(data: { lobby: Lobby, owner: LobbyPlayer }) {
		return this.http.post<{ lobby: Lobby, owner: LobbyPlayer }>(LOBBY_URLS.LOBBIES(), data);
	}

	deleteLobby(name: string) {
		return this.http.delete(LOBBY_URLS.LOBBIES(name));
	}

	fetchPlayers(lobbyName: string) {
		return this.http.get<LobbyPlayer[]>(LOBBY_URLS.PLAYERS(lobbyName));
	}

	fetchAllPlayers() {
		return this.http.get<LobbyPlayer[]>(LOBBY_URLS.ALL_PLAYERS);
	}

	savePlayer(player: LobbyPlayer) {
		return this.http.post<LobbyPlayer>(LOBBY_URLS.PLAYERS(player.lobby), player);
	}

	deletePlayer(lobbyName: string, playerName: string) {
		return this.http.delete(LOBBY_URLS.PLAYERS(lobbyName, playerName));
	}
}
